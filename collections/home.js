
import Home from '../models/home'

class Homes {
    constructor(){
        this.carousel = this.carousel.bind(this)
    }
    async carousel(request,response){
        console.log('carousel')
       try {
           let img = await Home.find()
           response.status(200).json({
               code:1,
               message:'获取成功',
               data:img
           })
       }catch(error) {
           response.status(401).json({
               code:0,
               message:error.message,
               data:[]
           })
       }
    }
    async carouselStore(request,response){
        let query = request.body.params||request.query;

        let create = await Home.create(query)
        console.log(create)
        if(create){
            let data = await Home.find()
            response.status(200).json({
                code:1,
                message:'添加成功',
                data
            })
        }else{
            response.status(401).json({
                code:0,
                message:'添加失败',
                data:[]
            })
        }

    }
}

export default new Homes()
