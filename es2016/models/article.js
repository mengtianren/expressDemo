import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{type:String,default:'this is title'},
    content:{type:String,default:'this is content'},
    watch_num:{type:Number,default:1},
    create_time:{type:Number,default:Date.parse(new Date())},
    tag:{type:String,default:'web'},
    user:{type:Schema.Types.ObjectId,ref:'user'}
})

const Article = mongoose.model('article',articleSchema)

export default Article
