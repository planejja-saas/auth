import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import { SERVER_PORT } from './config/dynamo.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}))

app.use(express.json())

app.use('/auth', authRoutes)

app.listen(Number(SERVER_PORT), () => {
  console.log(`Auth API listening on port ${SERVER_PORT}`)
})
