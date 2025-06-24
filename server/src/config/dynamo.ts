import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

// Validar variáveis de ambiente
const {
  AWS_REGION,
  KEY,
  SECRET_KEY,
  USERS_TABLE,
  JWT_SECRET,
  PORT
} = process.env

if (!AWS_REGION || ! KEY || !SECRET_KEY) {
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
  accessKeyId: KEY,
  secretAccessKey: SECRET_KEY
})

// Exportar cliente e constantes
export const ddb = new AWS.DynamoDB.DocumentClient()
export const USERS_TABLE_NAME = USERS_TABLE
export const JWT_SECRET_KEY = JWT_SECRET
export const SERVER_PORT = PORT || '3001'
