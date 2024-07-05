
const mongoose=require('mongoose')

const otp_schema=new mongoose.Schema({
    email:{
        type:String,
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