"use strict";

/*
 * MiddleWare for the entire app
*/

module.exports = exports = {
  logError: function (err, req, res, next) {
    if (err) {
      console.error(err);
      return next(err);
    }
    next();
  },

  handleError: function (err, req, res, next) {
    if (err) {
      res.send(err, 500);
    }
  },

  cors: function (req, res, next) {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Controll-Allow-Header', 'Cotent-tyope, Authorization');

    if (req.method === 'Options') {
      res.send(200);
    } else {
      return next();
    }
  },

  authenticate: function (Room) { // expect mongoose
    return function (req, res, next) {
      if (req.body.room) {
        Room.find({room: req.body.room}, function (err, room) {
          if (err) next();
          req.commune.room = room;
          req.commune.pass =
            req.body.pass ? room.authenticate(req.body.pass) : false;
          next();
        });
      } else next();
    };
  }
};