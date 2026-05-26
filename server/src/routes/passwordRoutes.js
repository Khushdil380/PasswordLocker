import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { masterPasswordLimiter } from '../middleware/rateLimiter.js'
import { getPasswords, createPassword, updatePassword } from '../controllers/passwordEntryController.js'
import { viewPassword } from '../controllers/viewPasswordController.js'

const router = Router()

router.use(protect)

router.get('/', getPasswords)
router.post('/', createPassword)
router.put('/:id', updatePassword)
router.post('/:id/view', masterPasswordLimiter, viewPassword)

export default router
