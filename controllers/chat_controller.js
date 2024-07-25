// controllers/chatController.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('a user connected');
  
      socket.on('msg', (msg) => {
        console.log('chat message', msg);
        socket.emit('msg','data')
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  };
  