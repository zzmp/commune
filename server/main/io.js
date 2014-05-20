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
    socket.on('leaveRoom', function () {
      util.leaveRoom(socket);
    });
    socket.on('disconnect', function () {
      util.leaveRoom(socket);
    });

    // Queue audio
    socket.on('queue', function () {
      util.queue(io, socket);
    });

    // Dequeue audio
    socket.on('dequeue', function () {
      util.dequeue(io, socket);
    });

    // Play audio
    socket.on('play', function () {
      util.play(io, socket);
    });

    // Skip audio
    socket.on('stop', function () {
      util.stop(io, socket);
    });

    // Relay audio
    socket.on('audio', function (data) {
      util.relay(socket, data);
    });
  });

  return io;
};