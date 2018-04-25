

class Public {
    constructor(){

    }
    async login(request,response,next){
        let user = request.session.user;
        //判断是否登录入
        if(!user){
            request.session.user = null;
            response.locals.user=null;
            console.log('您还未登陆')
            response.status(401).json({
                code:0,
                message:'登陆失效或未登录',
                data:{}
            })
            return
        }else if(user) {
            console.log(`${user.phone}已处于登录状态`)
            next();
        }
    }

}
export default new Public()
