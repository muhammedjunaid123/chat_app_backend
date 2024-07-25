const express = require('express')
const user_route = express.Router()
const user_controller = require('../controllers/user_controller')
const upload = require('../config/multer-config');
const user_auth=require('../middleware/user_auth')
//User login .it will send otp to mail
user_route.post('/login',user_controller.user_login)
// it will check  the user otp is valid or not 
user_route.post('/otp',user_controller.otp_check)
// get user data
user_route.get('/get_user',user_controller.get_user)
//update user data with img
user_route.post('/set_user_data', upload.single('image'),user_controller.set_user_data)
//get all user list
user_route.get('/user_list',user_auth.UserisLogin,user_controller.user_list)
//to set the chat and message data
user_route.post('/single_chat_setup',user_auth.UserisLogin,user_controller.single_chat_setup)

module.exports = user_route