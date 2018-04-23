import express from 'express'

import Citys from '../collections/city'
const CityRouter = express.Router();

CityRouter.get('/getcity',Citys.getCity)    //获取列表
CityRouter.post('/addcity',Citys.addCity)   //添加数据
CityRouter.post('/delcity',Citys.delCity)   //删除单条数据
CityRouter.post('/updcity',Citys.updCity)   //更细数据

export default CityRouter
