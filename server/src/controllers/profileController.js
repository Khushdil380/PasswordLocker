import User from '../models/User.js'
import Otp from '../models/Otp.js'
import bcrypt from 'bcryptjs'
import { generateOtp } from '../utils/generateOtp.js'
import { sendEmail } from '../utils/emailService.js'
import { passwordChangeOtpTemplate } from '../utils/emailTemplates.js'

export const updateName = async (req, res) => {
  try {
    const { fullName } = req.body
    const trimmed = fullName?.trim()

    if (!trimmed || trimmed.length > 50) {
      return res.status(400).json({ message: 'Name must be 1-50 characters' })
    }

    const user = await User.findById(req.user._id)
    user.fullName = trimmed
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
      message: 'Name updated successfully',
      user: { id: user._id, fullName: user.fullName, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const sendUpdateEmailOtp = async (req, res) => {
  try {
    const { newEmail } = req.body

    if (!newEmail || !newEmail.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (newEmail.toLowerCase() === req.user.email) {
      return res.status(400).json({ message: 'New email must differ from current' })
    }

    const existing = await User.findOne({ email: newEmail.toLowerCase() })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const otp = generateOtp()
    await Otp.findOneAndDelete({ email: newEmail.toLowerCase(), 'userData.purpose': 'update-email' })
    await Otp.create({
      email: newEmail.toLowerCase(),
      otp,
      userData: { purpose: 'update-email', userId: req.user._id.toString() },
    })

    await sendEmail({
      to: newEmail,
      subject: 'Verify Your New Email - Password Locker',
      html: passwordChangeOtpTemplate(otp, 'update-email'),
    })

    res.status(200).json({ message: 'OTP sent to new email' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const verifyUpdateEmail = async (req, res) => {
  try {
    const { newEmail, otp } = req.body

    const otpRecord = await Otp.findOne({
      email: newEmail.toLowerCase(),
      'userData.purpose': 'update-email',
      'userData.userId': req.user._id.toString(),
    })

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired. Please try again.' })
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    const user = await User.findById(req.user._id)
    user.email = newEmail.toLowerCase()
    await user.save({ validateBeforeSave: false })
    await Otp.deleteOne({ _id: otpRecord._id })

    res.status(200).json({
      message: 'Email updated successfully',
      user: { id: user._id, fullName: user.fullName, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
