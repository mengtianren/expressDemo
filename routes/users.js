
import express from 'express'

import Users from '../collections/users'
import Public from '../collections/public'


const userRouter = express.Router();
// getUser
userRouter.post('/register',Users.register)
userRouter.post('/login',Users.login)
userRouter.post('/modify',Public.login,Users.modify)
userRouter.get('/getuser',Users.getUser)

export default userRouter
