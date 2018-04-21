
import express from 'express'

import Users from '../collections/users'
import Public from '../collections/public'


const userRouter = express.Router();

userRouter.post('/register',Users.register)
userRouter.post('/login',Users.login)
userRouter.post('/modify',Public.login,Users.modify)


export default userRouter
