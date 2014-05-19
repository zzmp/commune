var socket = require('socket.io');

module.exports = function (server) {
  var io = socket.listen(server);
  
  io.sockets.on('connection', function (socket) {
    socket.emit('transmit', true);
    socket.on('audio', function (packet) {
      console.log(packet);
    });
  });

  return io;
};