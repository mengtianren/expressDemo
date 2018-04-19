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
            User.create(query,async (error)=>{
                if(error){
                    response.status(500).json(error)
                }else{
                    let list = await User.findOne({phone:query.phone});
                        // console.log(list)
                    response.status(200).json({
                        code:1,
                        message:'注册成功',
                        data:{
                            nickName:list.nickName,
                            sex:list.sex,
                            headImg:list.headImg,
                            phone:list.phone
                        }
                    })
                }
            })
        }
    }

    async login(request,response){
        console.log('denglu',request)
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
        // console.log('==========',query)
        let userLogin = await User.findOne({phone:query.phone,password:query.password});
        // console.log(userLogin)
        if(userLogin){
            request.session.user = userLogin.phone
            response.status(200).json({
                code:1,
                message:'登陆成功',
                data:{
                    nickName:userLogin.nickName,
                    sex:userLogin.sex,
                    headImg:userLogin.headImg,
                    phone:userLogin.phone,
                    session:request.session.user
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
