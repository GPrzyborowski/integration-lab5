import express from 'express'
import { getUsers, newUser } from '../controllers/users.controller'

const router = express.Router()

router.get('/get-users', getUsers)
router.post('/new-user', newUser)

export default router
