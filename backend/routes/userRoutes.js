import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
// router.route('/').get(authUser)
router.post('/login', authUser)

// protect middleware will run when it hit this route
router.route('/profile').get(protect, getUserProfile)

export default router
