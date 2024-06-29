
//
const express=require('express')
const app=express()
const user_route=require('./routes/user_route')
require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect(process.env.db_url)

//
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',user_route)



app.listen(3000,()=>{
    console.log('server running on port 3000');
})