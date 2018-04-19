import express from 'express'

import Homes from '../collections/home'
const homeRouter = express.Router();

homeRouter.get('/carousel',Homes.carousel)
homeRouter.post('/carousel/store',Homes.carouselStore)
export default homeRouter
