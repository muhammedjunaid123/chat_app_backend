
const mongoose = require('mongoose')

const chat_schema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Types.ObjectId, ref: 'User' 
        }
    ],
    admin: [
        {
            type: mongoose.Types.ObjectId, ref: 'User' 
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