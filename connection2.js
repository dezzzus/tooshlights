module.exports = function (io) {
  io.sockets.on('connection', (socket) => {
    console.log('user connected')
    //socket.emit('userName');

    socket.on('flash', (evt) => {
      console.log ('received user flash event : ');
      //console.log (evt);
      socket.broadcast.emit('flash', {});
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}