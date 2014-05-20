var Room   = require('../db/Room.js');

var rooms = {};

createRoom = module.exports.createRoom = function (socket, data) {

};

joinRoom = module.exports.joinRoom = function (socket, data) {
      Room.findOne({room: data.room}, function (err, room) {
        if (err) socket.emit('authenticate', false);
        else {
          var authenticated = false;
          if (room && room.authenticate && room.authenticate(data.pass))
            authenticated = true;
          socket.emit('authenticate', authenticated);

        }
      });
};

leaveRoom = module.exports.leaveRoom = function (socket) {

};

queue = module.exports.queue = function (socket) {

};

dequeue = module.exports.dequeue = function (socket) {

};

play = module.exports.play = function (socket) {

};

skip = module.exports.skip = function (socket) {

};

relay = module.exports.relay = function (socket) {

};