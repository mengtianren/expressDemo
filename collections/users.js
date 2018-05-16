import md5 from 'md5'

import User from '../models/users'
import Publice from '../util/publiceData'


class Users {
    constructor(){
    }
     register = async(request,response) => {
        let query = request.body||request.query;
        console.log(request.body)
        query.createTime = Date.parse(new Date())
         console.log(123)
        let Msg = await User.findOne({phone:query.phone});
        if(Msg){
            console.log('321')
            Publice.returnJSON(response,200,0,'用户已存在',[])
        }else{
            let pass = md5(query.password);
            query.password = pass;
            User.create(query,async (error,data)=>{
                if(error){
                    Publice.returnJSON(response,401,0,'',error)
                }else{
                    let data = {
                            nickName:data.nickName,
                            sex:data.sex,
                            headImg:data.headImg,
                            phone:data.phone
                        }
                    Publice.returnJSON(response,200,1,'注册成功',data)
                }
            })
        }
    }
     login = async(request,response) => {
        let query =request.body || request.query;
        console.log(query)
        if(!query.phone||!query.password){
            Publice.returnJSON(response,401,0,'账号或密码不能为空',[])
            return
        }
        User.findOne({phone:query.phone,password:md5(query.password)},{password:0})
            .populate('citys','name').exec((err,data) => {
            if(err){
                Publice.returnJSON(response,401,0,err.meassage,{})
            }else{
              if(data.length !== 0){
                  request.session.user = data   //设置当前用户session
                  Publice.returnJSON(response,200,1,'登陆成功',data)
              }else{
                  Publice.returnJSON(response,401,0,'用户不存在或密码错误',[])
              }
            }
        })
    }
     modify = async(request,response) => {
        let query = await request.body || request.query;
        let data = await User.findOne({phone:query.phone});
        // console.log('修改',data)
        if(data){
            let create = await User.update(query)
            if(create){
                let data = await User.findOne({phone:query.phone});
                Publice.returnJSON(response,200,1,'修改成功',data)
            }else{
                Publice.returnJSON(response,401,0,'修改失败',data)
            }
        }else{
            Publice.returnJSON(response,401,0,'修改失败',data)
        }
    }
     getUser = async(request,response) => {
        User.findById('5adef2a5c8601b15b0ca35c4',{password:0})
            .populate('citys','name').exec((err,data) => {
            if(err){
                Publice.returnJSON(response,401,0,'获取信息失败',err.meassage)
            }else{
                Publice.returnJSON(response,200,1,'获取信息成功',data)
            }
        })
    }
     adminGetUserList = async(request,response) => {
        User.find({}).populate('citys','name').exec((err,data)=>{
            if(err){
                Publice.returnJSON(response,400,0,'获取失败',[])
                return
            }
            Publice.returnJSON(response,200,1,'获取成功',data)
        })
    }
}
export default new Users()
