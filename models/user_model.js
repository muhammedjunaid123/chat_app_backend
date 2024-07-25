
const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique : true,
    },
    user_name: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    is_verified:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model('user', user_schema)