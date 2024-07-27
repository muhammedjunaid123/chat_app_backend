const user_model = require('../models/user_model')

const user_create = async (email) => {
    try {
        let data = await user_model.findOne({ email: email })
        if (!data) {
            data = new user_model({ email: email })
            const user_data = await data.save()
            if (user_data) {
                return user_data
            } else {
                throw new Error('not found')
            }
        }
        return data
    } catch (error) {
        return error
    }
}
const get_user = async (email) => {
    try {
        
        return user_model.findOne({ email: email })
    } catch (error) {
        
    }
}
const user_profile_update = async (id, name, res, url) => {
    try {
        
        if (url) {
            await user_model.findByIdAndUpdate({ _id: id }, { $set: { img: url, user_name: name } })
        } else {
            await user_model.findByIdAndUpdate({ _id: id }, { $set: { user_name: name } })
        }
        res.json({ success: true })
    } catch (error) {
        
    }
    }
    const user_list = async (email) => {
        try {
        return user_model.find({email:{$ne:email}})
    } catch (error) {
        return error
    }
}
module.exports = {
    user_create,
    get_user,
    user_profile_update,
    user_list
}