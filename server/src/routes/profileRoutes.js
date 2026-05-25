import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { updateName, sendUpdateEmailOtp, verifyUpdateEmail } from '../controllers/profileController.js'
import { sendChangePasswordOtp, changePassword, changeMasterPassword } from '../controllers/passwordController.js'

const router = Router()

router.use(protect)

router.put('/name', updateName)
router.post('/email/send-otp', sendUpdateEmailOtp)
router.put('/email/verify', verifyUpdateEmail)
router.post('/password/send-otp', sendChangePasswordOtp)
router.put('/password/change', changePassword)
router.put('/master-password/change', changeMasterPassword)

export default router
