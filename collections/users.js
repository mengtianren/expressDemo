import md5 from 'md5'

import User from '../models/users'


class Users {
    constructor(){
        this.register = this.register.bind(this)
    }
    async register(request,response){
        let query = request.query;
        query.createTime = Date.parse(new Date())
        let Msg = await User.findOne({phone:query.phone});
        if(Msg){
            response.status(200).json({code:0,message:'用户已存在'})
            return ;
        }else{
            let pass = md5(query.password);
            query.password = pass;
            User.create(query,async (error,data)=>{
                if(error){
                    response.status(401).json(error)
                }else{
                    response.status(200).json({
                        code:1,
                        message:'注册成功',
                        data:{
                            nickName:data.nickName,
                            sex:data.sex,
                            headImg:data.headImg,
                            phone:data.phone
                        }
                    })
                }
            })
        }
    }
    async login(request,response){
        let query = request.body||request.query;
        console.log(query)
        if(!query.phone||!query.password){
            response.status(200).json({
                code:0,
                message:'账号或密码不能为空'
            })
            return
        }
        User.find({phone:query.phone,password:md5(query.password)},{password:0})
            .populate('citys','name').exec((err,data)=>{
            console.log(err,data)
            if(err){
                response.status(401).json({
                    code:0,
                    message:'登陆失败',
                    data:err.meassage
                })
            }else{
              if(data.length !== 0){
                  request.session.user =  data   //设置当前用户session
                  response.status(200).json({
                      code:1,
                      message:'登陆成功',
                      data
                  })
              }else{
                  response.status(401).json({
                      code:0,
                      message:'用户不存在或密码错误',
                      data:[]
                  })
              }
            }
        })
    }
    async modify(request,response){
        let query = request.query;

        let data = await User.findOne({phone:query.phone});
        // console.log('修改',data)
        if(data){
            let create = await User.update(query)
            if(create){
                let data = await User.findOne({phone:query.phone});
                response.status(200).json({
                    code:1,
                    message:'修改成功',
                    data
                })
            }else{
                response.status(401).json({
                    code:0,
                    message:'修改失败',
                    data
                })
            }
        }else{
            response.status(401).json({
                code:0,
                message:'修改失败',
                data
            })
        }
    }
    async getUser(request,response){
        User.findById('5adef2a5c8601b15b0ca35c4',{password:0})
            .populate('citys','name').exec((err,data)=>{
            console.log(err,data)
            if(err){
                response.status(401).json({
                    code:0,
                    message:'获取信息失败',
                    data:err.meassage
                })
            }else{
                response.status(200).json({
                    code:1,
                    message:'获取信息成功',
                    data
                })
            }
        })
    }


}
export default new Users()
