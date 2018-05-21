import mongoose from 'mongoose'

const Schema = mongoose.Schema;
/**
 * 评论内容model
 */
const commentSchema = new Schema({
    watch_num:{type:Number,default:1},
    comment:{type:Number,default:1},
    content:{type:String,default:'这里是评论'},
    article:{type:Schema.Types.ObjectId,ref:'article'},
    create_time:{type:Number,default:Date.parse(new Date())},
    user:{type:Schema.Types.ObjectId,ref:'user'}
})
const Comment = mongoose.model('comment',commentSchema)

export default Comment
