
//
const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
     origin: 'http://localhost:4200',
  method: "*"
  }
});
const chatController=require('./controllers/chat_controller')
chatController(io);
const job=require('./job')
const user_route = require('./routes/user_route')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.db_url)
const cors = require('cors')


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var corsOptions = {
  origin: 'http://localhost:4200',
  method: "*"
}
app.use(cors(corsOptions)) 


 

//
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/user', user_route)




httpServer.listen(3000, () => {
  console.log('server running on port 3000');
})

// module.exports={
//   io
// }