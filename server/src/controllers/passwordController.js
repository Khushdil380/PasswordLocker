import User from '../models/User.js'
import Otp from '../models/Otp.js'
import bcrypt from 'bcryptjs'
import { generateOtp } from '../utils/generateOtp.js'
import { sendEmail } from '../utils/emailService.js'
import { passwordChangeOtpTemplate } from '../utils/emailTemplates.js'

export const sendChangePasswordOtp = async (req, res) => {
  try {
    const otp = generateOtp()
    const hashedOtp = await bcrypt.hash(otp, 10)
    const purpose = req.body.purpose || 'change-password'

    await Otp.findOneAndDelete({ email: req.user.email, 'userData.purpose': purpose })
    await Otp.create({
      email: req.user.email,
      otp: hashedOtp,
      userData: { purpose, userId: req.user._id.toString() },
    })

    await sendEmail({
      to: req.user.email,
      subject: purpose === 'change-master-password'
        ? 'Change Master Password - Password Locker'
        : 'Change Password - Password Locker',
      html: passwordChangeOtpTemplate(otp, purpose),
    })

    res.status(200).json({ message: 'OTP sent to your email' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const otpRecord = await Otp.findOne({
      email: req.user.email,
      'userData.purpose': 'change-password',
      'userData.userId': req.user._id.toString(),
    })

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired. Please try again.' })
    }

    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp)
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    const user = await User.findById(req.user._id)
    user.password = newPassword
    await user.save()
    await Otp.deleteOne({ _id: otpRecord._id })

    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const changeMasterPassword = async (req, res) => {
  try {
    const { otp, newMasterPassword } = req.body

    if (!newMasterPassword || newMasterPassword.length < 6) {
      return res.status(400).json({ message: 'Master password must be at least 6 characters' })
    }

    const otpRecord = await Otp.findOne({
      email: req.user.email,
      'userData.purpose': 'change-master-password',
      'userData.userId': req.user._id.toString(),
    })

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired. Please try again.' })
    }

    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp)
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    const user = await User.findById(req.user._id)
    user.masterPassword = await bcrypt.hash(newMasterPassword, 12)
    await user.save({ validateBeforeSave: false })
    await Otp.deleteOne({ _id: otpRecord._id })

    res.status(200).json({ message: 'Master password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
