import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'
import { COOKIE_OPTIONS } from '../config/constants.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)
    res.cookie('token', token, COOKIE_OPTIONS)

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, fullName: user.fullName, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

export const getMe = async (req, res) => {
  res.status(200).json({
    user: { id: req.user._id, fullName: req.user.fullName, email: req.user.email },
  })
}
