const express = require('express')
const user_route = express.Router()
const user_controller = require('../controllers/user_controller')


//User login .it will send otp to mail
user_route.post('/login',user_controller.user_login)
user_route.post('/otp',user_controller.otp_check)

module.exports = user_route