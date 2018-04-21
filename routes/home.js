import express from 'express'

import Homes from '../collections/home'
import Public from "../collections/public";

const homeRouter = express.Router();

homeRouter.get('/carousel',Public.login,Homes.carousel)
homeRouter.post('/carousel/store',Homes.carouselStore)
export default homeRouter
