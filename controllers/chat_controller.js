
const message_model = require('../models/message_model')
const jwt = require('jsonwebtoken')


module.exports = async (io) => {
  io.on('connection', (socket) => {
    console.log('connet')

    socket.on('send_msg', async (data) => {
      const { msg, id, user_email } = data
      const message = {
        email: user_email,
        content: msg
      }
      const result = await message_model.findByIdAndUpdate({ _id: id }, { $push: { messages: message } }, { new: true, useFindAndModify: false })
      io.emit('message', result)
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
