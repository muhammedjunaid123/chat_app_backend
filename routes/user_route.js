const express = require('express')
const user_route = express.Router()
const user_controller = require('../controllers/user_controller')
const upload = require('../config/multer-config');

//User login .it will send otp to mail
user_route.post('/login',user_controller.user_login)
// it will check  the user otp is valid or not 
user_route.post('/otp',user_controller.otp_check)

user_route.get('/get_user',user_controller.get_user)

user_route.post('/set_user_data', upload.single('image'),user_controller.set_user_data)
module.exports = user_route