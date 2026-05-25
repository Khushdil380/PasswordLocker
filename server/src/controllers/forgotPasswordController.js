import crypto from 'crypto'
import User from '../models/User.js'
import { sendEmail } from '../utils/emailService.js'
import { resetPasswordTemplate } from '../utils/emailTemplates.js'
import { generateToken } from '../utils/jwt.js'

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if email exists
      return res.status(200).json({ message: 'If the email exists, a reset link has been sent' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    // Store token temporarily (in production, save hashed token in DB)
    user.resetToken = resetToken
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000 // 15 min
    await user.save({ validateBeforeSave: false })

    await sendEmail({
      to: email,
      subject: 'Reset Your Password - Password Locker',
      html: resetPasswordTemplate(resetLink),
    })

    res.status(200).json({ message: 'If the email exists, a reset link has been sent' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
