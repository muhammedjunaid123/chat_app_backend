const otp_model = require('../models/otp_model')

const otp_create = async (otp, email) => {
    try {

        let today = new Date();
        today.setMinutes(today.getMinutes() - 3);
        await otp_model.deleteMany({ time: { $lt: today } });
        const Otp = new otp_model({
            otp: otp,
            email: email
        })
        await Otp.save()
    } catch (error) {

    }
}

const otp_check = async (otp, email) => {
    try {
        let today = new Date();
        today.setMinutes(today.getMinutes() - 3);
        await otp_model.deleteMany({ time: { $lt: today } });
        const otp_data = await otp_model.find({ otp: otp, email: email })

        if (otp_data.length <= 0) throw new Error('invalid otp')

        return true

    } catch (error) {
        return error
    }

}




module.exports = {
    otp_create,
    otp_check
}