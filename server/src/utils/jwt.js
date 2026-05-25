import jwt from 'jsonwebtoken'
import { SESSION_TIMEOUT } from '../config/constants.js'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: SESSION_TIMEOUT,
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
