import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

categorySchema.index({ user: 1, name: 1 }, { unique: true })
categorySchema.index({ user: 1, order: 1 })

export default mongoose.model('Category', categorySchema)
