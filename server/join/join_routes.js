"use strict";

var controller = require('./join_controllers.js');

module.exports = exports = function (router) {
  router.route('/')
    .post(controller.post);
};