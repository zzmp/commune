var Room   = require('../db/Room.js');

var sockets = {};
var queues = {};
var rooms = {};

createRoom = module.exports.createRoom = function (socket, data) {
  var name = data.room;
  var pass = data.pass;

  var room = new Room({
    leader: socket.id,
    room: name,
    pass: pass
  });

  room.save(function (err) {
    if (err) socket.emit('createRoom', false);
    else {
      socket.emit('createRoom', true);
      queues[name] = queues[name] || [];
      sockets[socket.id] = name;
    }
  });
};

joinRoom = module.exports.joinRoom = function (socket, data) {
  var name = data.room;
  var pass = data.pass;

  Room.findOne({room: name}, function (err, room) {
    if (err || !room) socket.emit('joinRoom', false);
    else {
      socket.emit('joinRoom', (room && room.authenticate(pass)));
      room.set('population', room.get('population') + 1);
      room.save();
      sockets[socket.id] = name;
    }
  });
};

leaveRoom = module.exports.leaveRoom = function (socket) {
  var name = sockets[socket.id];

  Room.findOne({room: name}, function (err, room) {
    if (!err && room) {
      room.set('population', room.get('population') - 1);
      room.save();
      delete sockets[socket.id];
    }
  });
};

queue = module.exports.queue = function (socket) {
  var name = sockets[socket.id];

  queues[name].push(socket.id);
};

dequeue = module.exports.dequeue = function (socket) {
  var name = sockets[socket.id];
  var i = queues[name].indexOf(socket.id);

  if (i >= 0) queues[name].splice(i, 1);
};

play = module.exports.play = function (io, socket) {
  var name = sockets[socket.id];
  var old = rooms[socket.id];
  var id = queues[name].shift();

  // Empty room
  if (old) {
    io.sockets.socket(old).emit('transmit', false);
    io.sockets.socket(old).leave(socket.id);
  }

  // Find first valid id
  while (!sockets[id] && queues[name].length) id = queues[name].shift();
  if (!sockets[id] && !queues[name].length) {
    socket.emit('play', false);
  } else {
  // Send new socket play request
    var partner = io.sockets.socket[id];
    socket.join(socket.id);
    partner.join(socket.id);
    rooms[socket.id] = id;
    rooms[id]=socket.id;
    partner.emit('transmit', true);
  }
};

stop = module.exports.stop = function (io, socket) {
  play(io.sockets.socket[rooms[socket.id]]);
}

relay = module.exports.relay = function (socket, data) {
  socket.broadcast.to(rooms[socket.id]).emit('audio', data);
};