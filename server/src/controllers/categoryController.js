import Category from '../models/Category.js'
import Password from '../models/Password.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).sort({ order: 1, createdAt: 1 })
    res.status(200).json({ categories })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    const trimmed = name?.trim()

    if (!trimmed) {
      return res.status(400).json({ message: 'Category name is required' })
    }

    const existing = await Category.findOne({ user: req.user._id, name: trimmed })
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' })
    }

    const count = await Category.countDocuments({ user: req.user._id })
    const category = await Category.create({ name: trimmed, user: req.user._id, order: count + 1 })
    res.status(201).json({ category })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const renameCategory = async (req, res) => {
  try {
    const { name } = req.body
    const trimmed = name?.trim()

    if (!trimmed) {
      return res.status(400).json({ message: 'Category name is required' })
    }

    const duplicate = await Category.findOne({ user: req.user._id, name: trimmed, _id: { $ne: req.params.id } })
    if (duplicate) {
      return res.status(400).json({ message: 'Category name already exists' })
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name: trimmed },
      { new: true }
    )

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({ category })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const reorderCategories = async (req, res) => {
  try {
    const { order } = req.body // array of { id, order }

    if (!Array.isArray(order)) {
      return res.status(400).json({ message: 'Order must be an array' })
    }

    const updates = order.map((item) =>
      Category.updateOne(
        { _id: item.id, user: req.user._id },
        { order: item.order }
      )
    )

    await Promise.all(updates)
    const categories = await Category.find({ user: req.user._id }).sort({ order: 1 })
    res.status(200).json({ categories })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Remove category reference from all passwords
    await Password.updateMany(
      { category: req.params.id, user: req.user._id },
      { category: null }
    )

    res.status(200).json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
