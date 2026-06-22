import Password from '../models/Password.js'
import User from '../models/User.js'
import MasterAttempt from '../models/MasterAttempt.js'
import bcrypt from 'bcryptjs'
import { decrypt } from '../utils/encryption.js'

const MAX_ATTEMPTS = 5
const LOCK_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export const viewPassword = async (req, res) => {
  try {
    const { masterPassword } = req.body
    const { id } = req.params

    if (!masterPassword) {
      return res.status(400).json({ message: 'Master password is required' })
    }

    // Check if user is currently locked out
    const attempt = await MasterAttempt.findOne({ user: req.user._id })
    if (attempt && attempt.lockedUntil && attempt.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((attempt.lockedUntil - new Date()) / 60000)
      return res.status(429).json({
        message: `Too many failed attempts. Please try again after ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
      })
    }

    // If lock has expired, reset the record
    if (attempt && attempt.lockedUntil && attempt.lockedUntil <= new Date()) {
      attempt.failedAttempts = 0
      attempt.lockedUntil = null
      await attempt.save()
    }

    const user = await User.findById(req.user._id)
    const isMatch = await bcrypt.compare(masterPassword, user.masterPassword)
    if (!isMatch) {
      // Track failed attempt
      const record = await MasterAttempt.findOneAndUpdate(
        { user: req.user._id },
        { $inc: { failedAttempts: 1 } },
        { upsert: true, new: true }
      )

      if (record.failedAttempts >= MAX_ATTEMPTS) {
        record.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS)
        await record.save()
        return res.status(429).json({
          message: 'Too many failed attempts. Please try again after 15 minutes.',
        })
      }

      const remaining = MAX_ATTEMPTS - record.failedAttempts
      return res.status(401).json({
        message: `Invalid master password. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`,
      })
    }

    // Successful verification — reset attempts
    if (attempt) {
      await MasterAttempt.deleteOne({ user: req.user._id })
    }

    const entry = await Password.findOne({ _id: id, user: req.user._id })
      .populate('category', 'name')

    if (!entry) {
      return res.status(404).json({ message: 'Password not found' })
    }

    const decryptedCurrent = decrypt(entry.password)
    const historyDecrypted = entry.history.map((h) => ({
      description: h.description,
      destinationLink: h.destinationLink,
      userId: h.userId,
      password: decrypt(h.password),
      changedAt: h.changedAt,
    }))

    // Combine: latest (current) first, then history (newer to older)
    const allVersions = [
      {
        description: entry.description,
        destinationLink: entry.destinationLink,
        userId: entry.userId,
        password: decryptedCurrent,
        changedAt: entry.updatedAt,
      },
      ...historyDecrypted,
    ]

    // Mark which fields changed compared to the next older version
    for (let i = 0; i < allVersions.length; i++) {
      if (i < allVersions.length - 1) {
        const current = allVersions[i]
        const older = allVersions[i + 1]
        const changedFields = []
        if (current.description !== older.description) changedFields.push('description')
        if (current.destinationLink !== older.destinationLink) changedFields.push('destinationLink')
        if (current.userId !== older.userId) changedFields.push('userId')
        if (current.password !== older.password) changedFields.push('password')
        allVersions[i].changedFields = changedFields
      } else {
        // Oldest version — no comparison, it's the baseline
        allVersions[i].changedFields = []
      }
    }

    res.status(200).json({
      entry: {
        _id: entry._id,
        title: entry.title,
        description: entry.description,
        destinationLink: entry.destinationLink,
        userId: entry.userId,
        category: entry.category,
        versions: allVersions,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to decrypt password. Please contact support.', error: error.message })
  }
}
