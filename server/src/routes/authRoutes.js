import { Router } from 'express'
import { signup, verifyOtp, resendOtp } from '../controllers/authController.js'
import { login, logout, getMe } from '../controllers/loginController.js'
import { forgotPassword } from '../controllers/forgotPasswordController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/signup', signup)
router.post('/verify-otp', verifyOtp)
router.post('/resend-otp', resendOtp)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.get('/me', protect, getMe)

export default router
