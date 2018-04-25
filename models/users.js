import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const userSchema = new Schema({
    phone:Number,
    password:String,
    createTime:{default:Date.parse(new Date()),type:Number},
    headImg:{default:'1.png',type:String},
    sex:{default:'男',type:String},
    nickName:{default:'暂无昵称',type:String},
    text:{default:'格言：配不上了自己的野心和辜负了所受的苦难。',type:String},
    citys:{
        type: Schema.Types.ObjectId,
        ref:'city'  //取值为数据库名字少个s mongoose.model('city') 取得为‘home’并不是export default 出去的值
                    //然后在控制器里面设置homes的 _id 也就是要关联表的数据id ，注：models必须是已经注册的，
                    // User.find().populate('city',['_id','city']) populate里面第一个参数为Users需要关联的字段属性名
                    //[]数组里面为要展示的字段
    }
})

const User = mongoose.model('user',userSchema)
export default User
