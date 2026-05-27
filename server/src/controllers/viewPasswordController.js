import Password from '../models/Password.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { decrypt } from '../utils/encryption.js'

export const viewPassword = async (req, res) => {
  try {
    const { masterPassword } = req.body
    const { id } = req.params

    if (!masterPassword) {
      return res.status(400).json({ message: 'Master password is required' })
    }

    const user = await User.findById(req.user._id)
    const isMatch = await bcrypt.compare(masterPassword, user.masterPassword)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid master password' })
    }

    const entry = await Password.findOne({ _id: id, user: req.user._id })
      .populate('category', 'name')

    if (!entry) {
      return res.status(404).json({ message: 'Password not found' })
    }

    const decryptedCurrent = decrypt(entry.password)
    const historyDecrypted = entry.history.map((h) => ({
      title: h.title || entry.title,
      description: h.description || '',
      destinationLink: h.destinationLink || '',
      userId: h.userId || '',
      password: decrypt(h.password),
      changedAt: h.changedAt,
    }))

    // Combine: latest first, then history (older)
    const allVersions = [
      {
        title: entry.title,
        description: entry.description,
        destinationLink: entry.destinationLink,
        userId: entry.userId,
        password: decryptedCurrent,
        changedAt: entry.updatedAt,
      },
      ...historyDecrypted,
    ]

    res.status(200).json({
      entry: {
        _id: entry._id,
        category: entry.category,
        versions: allVersions,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to decrypt password. Please contact support.', error: error.message })
  }
}
