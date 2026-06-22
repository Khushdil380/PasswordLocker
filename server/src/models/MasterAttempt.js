import mongoose from 'mongoose'

const masterAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  failedAttempts: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
}, { timestamps: true })

// Auto-cleanup: remove records that are older than 1 day (no longer relevant)
masterAttemptSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 86400 })

export default mongoose.model('MasterAttempt', masterAttemptSchema)
