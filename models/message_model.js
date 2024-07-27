const mongoose = require('mongoose')

const message_schema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    messages: [
        {
            email: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ]
})
module.exports=mongoose.model('message',message_schema)