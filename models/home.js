import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Home = new Schema({
    url:{default:'1.png',type:String},
    href:{default:'baidu.com',type:String},
    createTime:{default:Date.parse(new Date()),type:Number}
})
const HomeSchema = mongoose.model('home',Home);

export default HomeSchema
