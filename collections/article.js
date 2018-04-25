
import Article from '../models/article'

class Articles {
    constructor(){

    }
    async addArticle(request,response){
        let query = request.query;
        if(!query.title||!query.content||!query.user){
            response.status(401).json({
                code:0,
                message:'添加信息不完善',
                data:{}
            })
            return
        }
        query.create_time = Date.parse(new Date())
        Article.create(query,(err,data)=>{
            if(err){
                response.status(500).json({
                    code:0,
                    message:err.message,
                    data:{}
                })
                return
            }
            response.status(200).json({
                code:1,
                message:'添加成功',
                data
            })
        })
    }
    async getArticle(request,response){
        Article.find({})
            .populate('user',['headImg','sex','nickName','phone']).exec((err,data)=>{
            if(err){
                response.status(500).json({
                    code:0,
                    message:err.message,
                    data:[]
                })
                return
            }
            response.status(200).json({
                code:1,
                message:'获取列表成功',
                data
            })
        })
    }
    async getDetail(request,response){
        let query = request.query ;
        Article.update({_id:query.id},{$inc:{watch_num:1}},(err,data)=>{
            console.log(err,data)
        })
        Article.findById(query.id)
            .populate('user',['headImg','sex','nickName','phone']).exec((err,data)=>{
            if(err){
                response.status(500).json({
                    code:0,
                    message:err.message,
                    data:{}
                })
                return
            }
            response.status(200).json({
                code:1,
                message:'获取详情成功',
                data
            })
        })
    }
}

export default new Articles()