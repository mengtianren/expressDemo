
import Article from '../models/article'
import Publice from "../util/publiceData";

class Articles {
    constructor(){

    }
     addArticle = async(request,response) => {
        let query =  request.body||request.query;
        if(!query.title||!query.content){
            Publice.returnJSON(response,401,0,'添加信息不完善',{})
            return
        }
        query.create_time = Date.parse(new Date())
        Article.create(query,(err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.message,{})
                return
            }
            Publice.returnJSON(response,200,1,'添加成功',data)
        })
    }
    // 列表
     getArticle = async(request,response) => {
        Article.find({})
            .populate('user',['headImg','sex','nickName','phone']).exec((err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.message,[])
                return
            }
            Publice.returnJSON(response,200,1,'获取列表成功',data)
        })
    }
     getDetail = async(request,response) => {
        let query = request.query ;
        Article.update({_id:query.id},{$inc:{watch_num:1}},(err,data)=>{
            console.log(err,data)
        })

        Article.findById(query.id).populate('user',['headImg','sex','nickName','phone']).exec((err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.message,{})
                return
            }
            Publice.returnJSON(response,200,1,'获取详情成功',data)
        })
    }
    getHot = async(request,response) => {
        Article.find({watch_num:{$gt:10}})
            .populate('user',['headImg','sex','nickName','phone']).exec((err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.message,[])
                return
            }
            Publice.returnJSON(response,200,1,'获取热门成功',data)
        })
    }
    delArticle =  async(request,response) => {
        let query = request.body||request.query;
            console.log(query)
        Article.remove({_id:query.id},(err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.message,{})
                return
            }
            Publice.returnJSON(response,200,1,'删除成功',data)
        })
    }
     uptArticle = async(request,response) => {
        let query = request.body||request.query;
        if(query.id){
            Article.update({_id:query.id},{$set:query},(err,data)=>{
                if(err){
                    Publice.returnJSON(response,401,0,'修改失败，请稍后再试',{})
                }else{
                    Publice.returnJSON(response,200,1,'修改成功',{})
                }
            })
        }else{
            Publice.returnJSON(response,404,0,'请确认id存在',{})
        }
    }
}

export default new Articles()
