import { ThePublic} from '../util/publiceData'

class Public {
    constructor(){

    }
     login = async(request,response,next) => {
        let user = await request.session.user;
        //判断是否登录入
        console.log(user,'登陆判断=========')
        if(!user){
            request.session.user = null;
            response.locals.user=null;
            ThePublic.returnJSON(response,401,0,'登陆失效或未登录',{})
            return
        }else if(user) {
            console.log(`${user.phone}已处于登录状态`)
            next();
        }
    }

}
export default new Public()
