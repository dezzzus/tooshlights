module.exports = function (io) {
  io.sockets.on('connection', (socket) => {
    console.log('user connected')
    //socket.emit('userName');

    socket.on('user_event', (evt) => {
      console.log ('received user event : ');
      console.log (evt);
      socket.emit('applied_event', {});
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}