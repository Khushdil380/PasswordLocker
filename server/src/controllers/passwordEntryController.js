import Password from '../models/Password.js'
import { encrypt, decrypt } from '../utils/encryption.js'

export const getPasswords = async (req, res) => {
  try {
    const filter = { user: req.user._id }
    if (req.query.category) {
      filter.category = req.query.category
    }

    const passwords = await Password.find(filter)
      .populate('category', 'name')
      .sort({ updatedAt: -1 })
      .select('-password -history')

    res.status(200).json({ passwords })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const createPassword = async (req, res) => {
  try {
    const { title, description, destinationLink, userId, password, category } = req.body

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' })
    }

    const encrypted = encrypt(password)

    const entry = await Password.create({
      title: title.trim(),
      description: description?.trim() || '',
      destinationLink: destinationLink?.trim() || '',
      userId: userId?.trim() || '',
      password: encrypted,
      category: category || null,
      user: req.user._id,
    })

    const populated = await entry.populate('category', 'name')
    const { password: _, history: __, ...result } = populated.toObject()

    res.status(201).json({ password: result })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, destinationLink, userId, password, category } = req.body

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' })
    }

    const entry = await Password.findOne({ _id: id, user: req.user._id })
    if (!entry) {
      return res.status(404).json({ message: 'Password entry not found' })
    }

    // Prepare new values
    const newDescription = description?.trim() || ''
    const newDestinationLink = destinationLink?.trim() || ''
    const newUserId = userId?.trim() || ''
    const newPassword = password

    // Compare tracked fields with current values to decide if history snapshot is needed
    const currentPassword = decrypt(entry.password)
    const hasChange =
      entry.description !== newDescription ||
      entry.destinationLink !== newDestinationLink ||
      entry.userId !== newUserId ||
      currentPassword !== newPassword

    if (hasChange) {
      // Push current state as history snapshot
      entry.history.unshift({
        description: entry.description,
        destinationLink: entry.destinationLink,
        userId: entry.userId,
        password: entry.password,
        changedAt: entry.updatedAt,
      })

      // Cap history at 10 entries (keep newest 10)
      if (entry.history.length > 10) {
        entry.history = entry.history.slice(0, 10)
      }
    }

    // Update all fields
    entry.title = title.trim()
    entry.description = newDescription
    entry.destinationLink = newDestinationLink
    entry.userId = newUserId
    entry.password = encrypt(newPassword)
    entry.category = category || null

    await entry.save()

    const populated = await entry.populate('category', 'name')
    const { password: _, history: __, ...result } = populated.toObject()

    res.status(200).json({ password: result })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
