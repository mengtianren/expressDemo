
import Home from '../models/home'
import Publice from '../util/publiceData'
class Homes {
    constructor(){

    }
     carousel = async(request,response) => {
       try {
           let img = await Home.find()
           Publice.returnJSON(response,200,1,'获取成功',img)
       }catch(error) {
           Publice.returnJSON(response,401,0,error.message,[])
       }
    }
     carouselStore = async(request,response) => {
        let query = await request.body||request.query;
        let create = await Home.create(query)
        console.log(create)
        if(create){
            let data = await Home.find()
            Publice.returnJSON(response,200,1,'添加成功',data)
        }else{
            Publice.returnJSON(response,401,0,'添加失败',[])
        }

    }
}

export default new Homes()
