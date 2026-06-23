import { Router } from 'express'
import { signup, verifyOtp, resendOtp } from '../controllers/authController.js'
import { login, logout, getMe } from '../controllers/loginController.js'
import { forgotPassword, resetPassword } from '../controllers/forgotPasswordController.js'
import { protect } from '../middleware/auth.js'
import { loginLimiter, otpLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/signup', otpLimiter, signup)
router.post('/verify-otp', otpLimiter, verifyOtp)
router.post('/resend-otp', otpLimiter, resendOtp)
router.post('/login', loginLimiter, login)
router.post('/logout', logout)
router.post('/forgot-password', otpLimiter, forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/me', protect, getMe)

export default router
