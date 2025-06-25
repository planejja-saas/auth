import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  USERS_TABLE,
  JWT_SECRET,
  PORT
} = process.env

if (!AWS_REGION || ! AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Missing AWS credentials or region in .env')
}
if (!USERS_TABLE) {
  throw new Error('Missing USERS_TABLE in .env')
}
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in .env')
}


AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

export const ddb = new AWS.DynamoDB.DocumentClient()
export const USERS_TABLE_NAME = USERS_TABLE
export const JWT_SECRET_KEY = JWT_SECRET
export const SERVER_PORT = PORT || '3001'
