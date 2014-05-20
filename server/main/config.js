"use strict";

var middle = require('./middleware');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(express.static(__dirname + '/../../client'));
  app.use('/:path', express.static(__dirname + '/../../client'));
  app.use(middle.logError);
  app.use(middle.handleError);
};