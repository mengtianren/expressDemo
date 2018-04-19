
import express from 'express'

import Users from '../collections/users'

const userRouter = express.Router();

userRouter.post('/register',Users.register)

export default userRouter
