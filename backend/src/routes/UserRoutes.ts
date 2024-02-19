import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserController'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('user', deleteUser)

export default router