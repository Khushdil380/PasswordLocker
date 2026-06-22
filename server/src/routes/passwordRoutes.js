import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { getPasswords, createPassword, updatePassword } from '../controllers/passwordEntryController.js'
import { viewPassword } from '../controllers/viewPasswordController.js'

const router = Router()

router.use(protect)

router.get('/', getPasswords)
router.post('/', createPassword)
router.put('/:id', updatePassword)
router.post('/:id/view', viewPassword)

export default router
