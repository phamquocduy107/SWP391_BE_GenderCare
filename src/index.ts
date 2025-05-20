import express from 'express'
import pool from './services/database.service'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
// connect database
pool.connect()

app.listen(parseInt(process.env.PORT as string), () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
