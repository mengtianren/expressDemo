
import City from '../models/city'
import Publice from "../util/publiceData";

class Citys  {
    constructor(){

    }
     getCity = async(request,response) => {
        City.find({},(err,data)=>{
            if(err){
                Publice.returnJSON(response,401,0,'获取列表失败，请稍后再试',[])
            }else{
                Publice.returnJSON(response,200,1,'获取列表成功',data)
            }
        })
    }
     addCity = async(request,response) => {
        let query = await request.body||request.query;
        console.log(query)
        if(query.name){
            let findOne = await City.findOne({name:query.name});
            if(findOne){
                Publice.returnJSON(response,401,0,'城市已存在',findOne)
                return
            }
            City.create({name:query.name},(err,data)=>{
                if(err){
                    Publice.returnJSON(response,401,0,err.message,{})
                }else{
                    Publice.returnJSON(response,200,1,'添加成功',data)
                }
            })
        }
    }
     updCity = async(request,response) => {
        let query = awaitrequest.body || request.query;
        if(query.new_name&&query.old_name){
            City.update({name:query.old_name},{$set:{name:query.new_name}},(err,data)=>{
                if(err){
                    Publice.returnJSON(response,401,0,'修改失败，请稍后再试',{})
                }else{
                    Publice.returnJSON(response,200,1,'修改成功',{})
                }
            })
        }else{
            Publice.returnJSON(response,404,0,'请确认old_name和new_name的值存在',{})
        }
    }
     delCity = async(request,response) => {
        let query = await request.body||request.query;
        if(query.id){
            City.remove({_id:query.id},(err,data)=>{
                if(err){
                    Publice.returnJSON(response,401,0,'删除失败，请稍后再试',{})
                }else{
                    Publice.returnJSON(response,200,1,'删除成功',{})
                }
            })
        }
    }
}
export default new Citys()
