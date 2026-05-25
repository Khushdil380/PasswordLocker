import Password from '../models/Password.js'
import { encrypt } from '../utils/encryption.js'

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

    // Push current password to history before updating
    entry.history.push({
      password: entry.password,
      changedAt: entry.updatedAt,
    })

    // Update fields
    entry.title = title.trim()
    entry.description = description?.trim() || ''
    entry.destinationLink = destinationLink?.trim() || ''
    entry.userId = userId?.trim() || ''
    entry.password = encrypt(password)
    entry.category = category || null

    await entry.save()

    const populated = await entry.populate('category', 'name')
    const { password: _, history: __, ...result } = populated.toObject()

    res.status(200).json({ password: result })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
