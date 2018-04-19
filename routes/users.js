
import express from 'express'

import Users from '../collections/users'



const userRouter = express.Router();

userRouter.post('/register',Users.register)
userRouter.post('/login',Users.login)
userRouter.post('/modify',Users.modify)


export default userRouter
