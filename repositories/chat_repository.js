const chat_model = require('../models/chat_model')
const message_model = require('../models/message_model')

const single_chat_setup = async (user_one, user_two) => {
    try {

        const user = [{ email: user_one['email'], name: user_one['user_name'], img: user_one['img'] }, { email: user_two['email'], name: user_two['user_name'], img: user_two['img'] }]
        const chat = new chat_model({
            users: user
        })
        const data = await chat.save()
        const message = new message_model({
            chat_id: data._id
        })
        const data_message = await message.save()
        await chat_model.findByIdAndUpdate({ _id: data._id }, { $set: { message_id: data_message._id } })
        return true
    } catch (error) {
        return error
    }
}
const chat_list = async (user_email) => {
    try {
        return await chat_model.find({ users: { $elemMatch: { email: user_email } } })

    } catch (error) {
        return error
    }
}
const message_data =async (id) => {
    try {
 return await message_model.findById({_id:id})
    } catch (error) {
        return error
    }
}
module.exports = {
    single_chat_setup,
    chat_list,
    message_data
}