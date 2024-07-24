const mongoose = require('mongoose')

const message_schema = new mongoose.Schema({
    message_id: {
        type: ObjectId,
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
                default: new Date()
            }
        }
    ]
})
module.exports=mongoose.model('message',message_schema)