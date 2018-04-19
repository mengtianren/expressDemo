import mongoose from 'mongoose'

const url = 'mongodb://admin:admin@127.0.0.1/admin'
mongoose.connect(url)
const db = mongoose.connection;
db.once('open',()=>{
    console.log('数据库打开成功')
});
db.on('error',()=>{
    console.log('error')
})
export default db
