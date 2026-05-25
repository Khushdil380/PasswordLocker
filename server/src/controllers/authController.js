import User from '../models/User.js'
import Otp from '../models/Otp.js'
import { generateOtp } from '../utils/generateOtp.js'
import { generateToken } from '../utils/jwt.js'
import { sendEmail } from '../utils/emailService.js'
import { otpEmailTemplate, welcomeEmailTemplate } from '../utils/emailTemplates.js'
import { COOKIE_OPTIONS, DEFAULT_MASTER_PASSWORD } from '../config/constants.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const otp = generateOtp()

    await Otp.findOneAndDelete({ email })
    await Otp.create({
      email,
      otp,
      userData: { fullName, password },
    })

    await sendEmail({
      to: email,
      subject: 'Verify Your Email - Password Locker',
      html: otpEmailTemplate(otp),
    })

    res.status(200).json({ message: 'OTP sent to your email' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body

    const otpRecord = await Otp.findOne({ email })
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired. Please try again.' })
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    const { fullName, password } = otpRecord.userData
    const hashedMasterPassword = await bcrypt.hash(DEFAULT_MASTER_PASSWORD, 12)

    const user = await User.create({
      fullName,
      email,
      password,
      masterPassword: hashedMasterPassword,
      isVerified: true,
    })

    await Otp.deleteOne({ email })

    await sendEmail({
      to: email,
      subject: 'Welcome to Password Locker! 🎉',
      html: welcomeEmailTemplate(fullName),
    })

    res.status(201).json({
      message: 'Account created successfully',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body

    const otpRecord = await Otp.findOne({ email })
    if (!otpRecord) {
      return res.status(400).json({ message: 'No pending registration found' })
    }

    const otp = generateOtp()
    otpRecord.otp = otp
    otpRecord.expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await otpRecord.save()

    await sendEmail({
      to: email,
      subject: 'Your New OTP - Password Locker',
      html: otpEmailTemplate(otp),
    })

    res.status(200).json({ message: 'OTP resent' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
