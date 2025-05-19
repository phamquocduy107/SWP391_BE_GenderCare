import express from 'express'
import pool from './services/database.service'
const app = express()

pool.connect()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
