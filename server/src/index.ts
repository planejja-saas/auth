import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ddb, USERS_TABLE_NAME, JWT_SECRET_KEY, SERVER_PORT } from './config/dynamo'

const app = express()
app.use(express.json())

interface RegisterBody {
  companyName: string
  cnpj: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  companyEmail: string
  userName: string
  userEmail: string
  password: string
}

interface LoginBody {
  email: string
  password: string
}

app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const {
    companyName, cnpj, address, city, state, zip, phone, companyEmail,
    userName, userEmail, password
  } = req.body

  if (!companyName || !userEmail || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { Item } = await ddb.get({
      TableName: USERS_TABLE_NAME,
      Key: { email: userEmail }
    }).promise()

    if (Item) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const now = new Date().toISOString()

    const userItem = {
      email: userEmail,
      password: hashed,
      name: userName,
      company: {
        name: companyName,
        cnpj,
        address,
        city,
        state,
        zip,
        phone,
        email: companyEmail
      },
      createdAt: now
    }

    await ddb.put({
      TableName: USERS_TABLE_NAME,
      Item: userItem
    }).promise()

    return res.status(201).json({ message: 'User registered' })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/login', async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' })
  }

  try {
    const { Item } = await ddb.get({
      TableName: USERS_TABLE_NAME,
      Key: { email }
    }).promise()

    if (!Item) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, (Item as any).password)
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email: (Item as any).email, name: (Item as any).name },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    )

    return res.json({ token })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(+SERVER_PORT, () => {
  console.log(`🚀 Auth API listening on port ${SERVER_PORT}`)
})
