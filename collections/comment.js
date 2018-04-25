
import Comment from '../models/comment'

class Comments {
    constructor(){

    }
    async addComment(request,response){
        let query =request.body||request.query;
        //||!query.user 暂时谁都可以评论
        console.log(request.query,request.body,query)
        if(!query.content||!query.article){
            response.status(401).json({
                code:0,
                message:'添加信息不完善',
                data:{}
            })
            return
        }
        query.create_time = Date.parse(new Date())
        Comment.create(query,(err,data)=>{
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
    async getComment(request,response){
        let query = request.query
        if(!query.article){
            response.status(401).json({
                code:0,
                message:'article 不存在',
                data:[]
            })
            return
        }
        Comment.find({article:query.article})
            .populate('user',['headImg','sex','nickName','phone'])
            .exec((err,data)=>{
            if(err){
                response.status(500).json({
                    code:0,
                    message:err.meassage,
                    data:[]
                })
                return
            }
            response.status(200).json({
                code:1,
                message:'获取评论成功',
                data
            })
        })
    }
}

export default new Comments()
