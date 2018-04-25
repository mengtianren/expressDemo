import express from 'express'

import Homes from '../collections/home'
import Public from "../collections/public";

const homeRouter = express.Router();

homeRouter.get('/carousel',Homes.carousel)
homeRouter.post('/carousel/store',Public.login,Homes.carouselStore)
export default homeRouter
