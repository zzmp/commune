var socket = require('socket.io'),
    util   = require('./io.util.js');

module.exports = function (server) {
  var io = socket.listen(server);
  
  io.sockets.on('connection', function (socket) {
    // Create room
    socket.on('createRoom', function (data) {
      util.createRoom(socket, data);
    });

    // Join room
    socket.on('joinRoom', function (data) {
      util.joinRoom(socket, data);
    });

    // Leave room
    socket.on('disconnect', function() {
      util.leaveRoom(socket);
    });

    // Queue audio
    socket.on('queue', function (data) {
      util.queue(socket, data);
    });

    // Dequeue audio
    socket.on('dequeue', function (data) {
      util.dequeue(socket, data);
    });

    // Play audio
    socket.on('play', function () {
      util.play(socket);
    });

    // Skip audio
    socket.on('skip', function () {
      util.skip(socket);
    });

    // Relay audio
    socket.on('audio', function (data) {
      util.relay(socket, data);
    });
  });

  return io;
};