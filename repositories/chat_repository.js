const chat_model = require('../models/chat_model')
const message_model = require('../models/message_model')

const single_chat_setup = async (user_one, user_two) => {
    try {

        const user = [user_one._id, user_two._id]
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
const chat_list = async (id) => {
    try {
        return await chat_model.aggregate([
            {
                $match: {
                    users: { $in:[id]
                }
            }
        },
            {
                $lookup: {
                    from: 'users',
                    localField: 'users',
                    foreignField: '_id',
                    as: 'result'
                }
            }])
       

    } catch (error) {
        return error
    }
}
const message_data = async (id) => {
    try {
        return await message_model.findById({ _id: id })
    } catch (error) {
        return error
    }
}
module.exports = {
    single_chat_setup,
    chat_list,
    message_data
}