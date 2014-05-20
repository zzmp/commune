(function (angular) {
  "use strict";

  angular.module('commune.host.room', ['ngRoute', 'ngSocket'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/host/:room', {
        templateUrl: 'modules/hostRoom/room.tpl.html',
        controller: 'hostRoomCtrl'
      });
  })
  .controller('hostRoomCtrl', ['$scope', '$socket', 'stream',
    function ($scope, $socket, stream) {
    // Initialize queue size
    $scope.queue = 0;

    // Request new question
    $scope.play = function () {
      $socket.emit('play');
      $scope.playing = true;
    };
    // Listen for (no more) questions
    $socket.on('play', function (data) {
      $scope.playing = data;
    });
    // Listen for audio
    $socket.on('audio', function (packet) {
      $scope.packet = packet;
    });
    // Listen for queue size
    $socket.on('queue', function (data) {
      $scope.queue = data;
    });
  }]);
}(angular));
