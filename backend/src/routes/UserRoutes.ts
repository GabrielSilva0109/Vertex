import express, { Router } from 'express'
import multer from 'multer' 
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser, updateUserPicture } from '../controllers/UserController'

const router: Router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/user', createUser)
router.put('/userPicture/:id', upload.single('picture'), updateUserPicture)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/login', loginUser)

export default router;
