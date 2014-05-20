"use strict";

var express = require('express');
var app = express();
var routers = {};
var HostRouter = express.Router();
var JoinRouter = express.Router();

routers.HostRouter = HostRouter;
routers.JoinRouter = JoinRouter;

require('./config.js')(app, express, routers);

require('../host/host_routes.js')(HostRouter);
require('../join/join_routes.js')(JoinRouter);

module.exports = exports = app;