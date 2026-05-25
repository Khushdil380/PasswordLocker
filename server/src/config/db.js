import mongoose from 'mongoose'

let cached = null

const connectDB = async () => {
  if (cached) return cached

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    cached = conn
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    throw error
  }
}

export default connectDB
