import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updtateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
// router.route('/').get(authUser)
router.post('/login', authUser)

// protect middleware will run when it hit this route

// get(.get) user profile and/or update user profile(.put)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updtateUserProfile)

export default router
