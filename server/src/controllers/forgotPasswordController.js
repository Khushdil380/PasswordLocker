import crypto from 'crypto'
import User from '../models/User.js'
import { sendEmail } from '../utils/emailService.js'
import { resetPasswordTemplate } from '../utils/emailTemplates.js'

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

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { newPassword } = req.body

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset link. Please request a new one.' })
    }

    user.password = newPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    res.status(200).json({ message: 'Password reset successfully. You can now login.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
