"use strict";

var controller = require('./host_controllers.js');

module.exports = exports = function (router) {
  router.route('/')
    .post(controller.post);
};