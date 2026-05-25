import { verifyToken } from '../utils/jwt.js'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Session expired. Please login again.' })
  }
}
