
const mongoose = require('mongoose')

const chat_schema = new mongoose.Schema({
    users: [
        {
            email: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            img:{
                type:String
            }
        }
    ],
    is_group: {
        type: Boolean,
        default: false
    },
    group_name: {
        type: String,
        default: ''
    },
    message_id: {
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('chat', chat_schema)