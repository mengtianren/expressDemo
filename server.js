import express from 'express'
import bodyParser from 'body-parser'

import user from './routes/users'
import db from './db/db'


const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = process.env.PORT||3000;


app.use('/api/v1/user',user)
app.listen(port)

console.log(`当前监听的端口号是${port}`)
