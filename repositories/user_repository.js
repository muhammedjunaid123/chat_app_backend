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

module.exports = {
    user_create
}