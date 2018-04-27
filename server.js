import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import connectMongo from 'connect-mongo';


import SetRouter from './routes/index'

import db from './db/db'

const app = express(); //初始化express


app.all('*', (req, res, next) => {  //跨域请求头
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
/**
 * 解析post拿去附带数据
 */
app.use(bodyParser.urlencoded({extended:true}));//解析post的url
app.use(bodyParser.json()); // 把post数据转换为json格式
/**
 *
 * @type {*|name:cookie属性名，secret：作为服务器端生成session的签名}
 */
const MongoStore = connectMongo(session);  //在mongodb里面生成表存储用户的session
app.use(cookieParser('myapp')) //读取设置myapp的cookie对应的session，如果cookie发生改变则重新生成cookie
app.use(session({
    resave: false,  //重新保存
    saveUninitialized: false, //s是否缓存到本地
    secret: 'myapp',//通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie:{ maxAge: 1000*60*60*24},//失效时间
    store: new MongoStore({
        url:'mongodb://admin:admin@119.23.60.174:27017/admin',
        collection:'session',
        mongooseConnection:db
    })
}))
const port = process.env.PORT||3000;
SetRouter(app)
app.listen(port)

console.log(`当前监听的端口号是${port}`)
