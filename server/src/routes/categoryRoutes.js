import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import {
  getCategories, createCategory, renameCategory,
  reorderCategories, deleteCategory,
} from '../controllers/categoryController.js'

const router = Router()

router.use(protect)

router.get('/', getCategories)
router.post('/', createCategory)
router.put('/reorder', reorderCategories)
router.put('/:id', renameCategory)
router.delete('/:id', deleteCategory)

export default router
