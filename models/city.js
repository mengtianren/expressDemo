import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const citySchema = new Schema({
        name:String
})
const City = mongoose.model('city',citySchema)
export default City
