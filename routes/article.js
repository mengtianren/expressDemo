import express from 'express'

import Articles from '../collections/article'
const articleRouter = express.Router()

articleRouter.post('/addarticle',Articles.addArticle) //增
articleRouter.get('/getarticle',Articles.getArticle)    //查
articleRouter.post('/delarticle',Articles.delArticle)   //删
articleRouter.post('/uptarticle',Articles.uptArticle)   //修
articleRouter.get('/getdetail',Articles.getDetail)

export default articleRouter
