const otp_model = require('../models/otp_model')

const otp_create = async (otp, user_id) => {
    const Otp = new otp_model({
        otp: otp,
        user_id: user_id
    })
    await Otp.save()
    let today = new Date();
    today.setMinutes(today.getMinutes() - 2);
    console.log(today);
    const result = await otp_model.deleteMany({ time: { $lt: today } });
    console.log(result);
    
}

module.exports = {
    otp_create
}