import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import connectMongo from 'connect-mongo';


import user from './routes/users'
import home from './routes/home'
import city from './routes/city'

import db from './db/db'

const app = express();



app.all('*', (req, res, next) => {
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/**
 *
 * @type {*|name:cookie属性名，secret：作为服务器端生成session的签名}
 */
const MongoStore = connectMongo(session);
app.use(cookieParser('keyboard'))
app.use(session({
    resave: false,  //重新保存
    saveUninitialized: false, //
    secret: 'keyboard',//通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie:{ maxAge: 1000*60*60*24},//失效时间
    store: new MongoStore({
        url:'mongodb://admin:admin@119.23.60.174:27017/admin',
        collection:'session',
        mongooseConnection:db
    })
}))







const port = process.env.PORT||3000;


app.use('/api/v1/user',user)
app.use('/api/v1/home',home)
app.use('/api/v1/city',city)
app.listen(port)

console.log(`当前监听的端口号是${port}`)
