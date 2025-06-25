import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

const ddb = new AWS.DynamoDB()

async function createUsersTable() {
  const tableName = process.env.USERS_TABLE!
  try {
    await ddb.describeTable({ TableName: tableName }).promise()
    console.log(`Table "${tableName}" already exists.`)
  } catch (err: any) {
    if (err.code === 'ResourceNotFoundException') {
      console.log(`Creating table "${tableName}"…`)
      await ddb.createTable({
        TableName: tableName,
        AttributeDefinitions: [
          { AttributeName: 'email', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      }).promise()
      console.log(`Table "${tableName}" created successfully.`)
    } else {
      console.error('Error checking/creating table:', err)
      process.exit(1)
    }
  }
}

await createUsersTable()
