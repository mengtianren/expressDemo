import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone:Number,
    password:String,
    createTime:{default:Date.parse(new Date()),type:Number},
    headImg:{default:'1.png',type:String},
    sex:{default:'男',type:String},
    nickName:{default:'暂无昵称',type:String}
})
const User = mongoose.model('user',userSchema)
export default User
