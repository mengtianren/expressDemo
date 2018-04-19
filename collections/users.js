import md5 from 'md5'

import User from '../models/users'

class Users {
    constructor(){
        this.register = this.register.bind(this)
    }
    async register(request,response){
        let query = request.query;
        User.find({phone:query.phone},(error,data)=>{
        if(error){
            response.status(500).json({code:0,message:error})
        }else{
            if(data.length>0){
                response.status(200).json({code:0,message:'用户已存在'})
                return ;
            }else{
                let pass = md5(query.password);
                query.password = pass;
                User.create(query,(error)=>{
                    if(error){
                        response.status(500).json(error)
                    }else{
                        response.status(200).json({
                            code:1,
                            message:'注册成功'
                        })
                    }
                })
            }
        }
    });

    }


}
export default new Users()
