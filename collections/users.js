import md5 from 'md5'

import User from '../models/users'
import City from '../models/city'
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
                    response.status(500).json(error)
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
        // console.log('denglu',request)
        let query = request.body.params||request.query;
        if(!query.phone||!query.password){
            response.status(200).json({
                code:0,
                message:'账号或密码不能为空'
            })
            return
        }
        let pass = query.password;
        query.password = md5(pass);
        let userLogin = await User.findOne({phone:query.phone,password:query.password});
        if(userLogin){
            request.session.user =  userLogin   //设置当前用户session
            // console.log(request.session)
            // User.update({phone:query.phone},{$set:{citys:'5add3f7238b03118ac545023'}},(err,data)=>{
            //     console.log(data,'===========')
            // })
            User.find({phone:query.phone}).populate('citys','name').exec((err,data)=>{
                console.log(err,data)
            })
            response.status(200).json({
                code:1,
                message:'登陆成功',
                data:{
                    nickName:userLogin.nickName,
                    sex:userLogin.sex,
                    headImg:userLogin.headImg,
                    phone:userLogin.phone,
                    citys:userLogin.citys
                }
            })
        }else{
            response.status(500).json({
                code:0,
                message:'登陆失败'
            })
        }
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
                response.status(500).json({
                    code:0,
                    message:'修改失败',
                    data
                })
            }
        }else{
            response.status(500).json({
                code:0,
                message:'修改失败',
                data
            })
        }
    }


}
export default new Users()
