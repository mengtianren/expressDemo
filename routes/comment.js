import express from 'express'

import Comments from '../collections/comment'
const commentRouter = express.Router()

commentRouter.post('/addcomment',Comments.addComment)
commentRouter.get('/getcomment',Comments.getComment)

export default commentRouter
