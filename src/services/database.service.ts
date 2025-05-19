import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Database configuration
const dbConfig: PoolConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5436,
  // Optional: Configure connection pool
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000 // How long to wait for a connection
}

// Create a new pool instance
const pool = new Pool(dbConfig)

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack)
  } else {
    console.log('Successfully connected to PostgreSQL database')
    release()
  }
})

// Export the pool for use in other files
export default pool

// Helper function to execute queries
export const query = async (text: string, params?: any[]) => {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}
