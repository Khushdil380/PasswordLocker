import mongoose from 'mongoose'

const passwordHistorySchema = new mongoose.Schema({
  description: { type: String, default: '' },
  destinationLink: { type: String, default: '' },
  userId: { type: String, default: '' },
  password: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
}, { _id: false })

const passwordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  destinationLink: {
    type: String,
    trim: true,
    default: '',
  },
  userId: {
    type: String,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: [passwordHistorySchema],
    default: [],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

passwordSchema.index({ user: 1 })
passwordSchema.index({ user: 1, category: 1 })

export default mongoose.model('Password', passwordSchema)
