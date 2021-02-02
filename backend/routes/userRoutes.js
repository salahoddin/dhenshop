import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updtateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)

// router.route('/').get(authUser)
router.post('/login', authUser)

// protect middleware will run when it hit this route
// get(.get) user profile and/or update user profile(.put)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updtateUserProfile)

router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default router
