
import Comment from '../models/comment'
import Publice from "../util/publiceData";

class Comments {
    constructor(){

    }
     addComment = async(request,response) => {
        let query = await request.body || request.query;
        //||!query.user 暂时谁都可以评论
        if(!query.content||!query.article){
            Publice.returnJSON(response,401,0,'添加信息不完善',{})
            return
        }
        if(!query.user){
            Publice.returnJSON(response,401,0,'请登陆后再试',{})
            return
        }
        console.log(query,'=========')
        query.create_time = Date.parse(new Date())
        Comment.create(query,(err,data) => {
            if(err){
                Publice.returnJSON(response,500,0,err.message,{})
                return
            }
            Publice.returnJSON(response,200,1,'添加成功',data)
        })
    }
     getComment = async(request,response) => {
        let query = request.query
        if(!query.article){
            Publice.returnJSON(response,401,0,'article 不存在',[])
            return
        }
        Comment.find({article:query.article})
            .populate('user',['headImg','sex','nickName','phone'])
            .exec((err,data)=>{
            if(err){
                Publice.returnJSON(response,500,0,err.meassage,[])
                return
            }
            Publice.returnJSON(response,200,1,'获取评论成功',data)
        })
    }
}

export default new Comments()
