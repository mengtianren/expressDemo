import express from 'express'

import Articles from '../collections/article'
const articleRouter = express.Router()

articleRouter.post('/addarticle',Articles.addArticle)
articleRouter.get('/getarticle',Articles.getArticle)
articleRouter.get('/getdetail',Articles.getDetail)

export default articleRouter
