import 'dotenv/config'
import connectDB from '../../src/config/db.js'

export default async function handler(req, res) {
  try {
    await connectDB()
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}
