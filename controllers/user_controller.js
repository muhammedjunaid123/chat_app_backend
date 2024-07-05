
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const user_repo = require('../repositories/user_repository')
const otp_repo = require('../repositories/otp_repository');
const jwt = require('jsonwebtoken')


//User login .it will send otp to mail
const user_login = async (req, res) => {

    const { email } = req.body

    //get or creating user data
    let user_id = await user_repo.user_create(email)
    user_id = user_id['_id']

    //otp create
    const bytes = crypto.randomBytes(4)
    let otp = ''
    for (let i = 0; i < bytes.length; i++) {
        otp += (bytes[i] % 10).toString()
    }

    //send email
    await email_send(otp, email, user_id, res)

}
// mail transporter
const email_send = async (otp, email, user_id, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.DEV_MAIL,
            pass: process.env.DEV_PASS,
        }
    });



    const mailOption = {
        to: email,
        from: 'Jchatapp@gmail.com',
        subject: 'Jchatapp Email Verification',
        text: 'Jchatapp',
        html: `<table style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <tr>
                <td style="text-align: center; background-color: #000; padding: 10px; color: #fff;">
                    <h1>OTP Verification</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p>Hello, ${email}</p>
                    <p>You are just one step away from accessing our platform. To ensure your security and access to our WEBSITE, please verify your identity by entering the OTP (One-Time Password) provided below:</p>
                    <p>OTP: <strong style="background-color: #000;color: #fff;">${otp}</strong></p>
                    <p>Please use this OTP to complete the verification process .</p>
                    <p>If you did not request this verification, please ignore this email, and contact our support team immediately.</p>
                    <p>Thank you for choosing our platform. We look forward to having you as part of our community.</p>
                    <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
                    <p>Best regards,<br>Jchatapp Team</p>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; background-color: #000; padding: 10px; color: #fff;">
                    <p>&copy; ${new Date().getFullYear()}Jchatapp. All rights reserved.</p>
                </td>
            </tr>
        </table>
        `,
    };
    await transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            return res.status(500).json(err)
        }
        else {
            console.log('email has been send:-', info.response);
            otp_repo.otp_create(otp, email)
            return res.status(201).json({ success: true,email:email })

        }
    })

}


const otp_check = async (req, res) => {
    const { otp, email } = req.body
    const result = await otp_repo.otp_check(otp, email)
    if (result instanceof Error) {
        return res.status(500).json({message:result['message']})
    }

    const token = jwt.sign(email, process.env.jwt_s)
    return res.status(200).json({ success: true, token: token })
}

module.exports = {
    user_login,
    otp_check
}