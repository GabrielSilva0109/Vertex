import express, { Router } from 'express'
import { getUsers } from '../controllers/awsUser'

const router: Router = express.Router()

router.get('/users', getUsers)

export default router