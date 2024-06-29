const { ObjectId } = require('mongodb')
const mongoose=require('mongoose')

const otp_schema=new mongoose.Schema({
    user_id:{
        type:ObjectId,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    
    time:{
        type:Date,
        default:new Date()
    }
})
module.exports=mongoose.model('otp',otp_schema)