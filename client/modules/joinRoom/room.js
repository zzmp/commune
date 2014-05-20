(function (angular) {
  "use strict";
  angular.module('commune.join.room', ['ngRoute', 'ngSocket'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/join/:room', {
        templateUrl: 'modules/joinRoom/room.tpl.html',
        controller: 'joinRoomCtrl'
      });
  })
  .controller('joinRoomCtrl', ['$scope', '$socket', 'stream',
    function ($scope, $socket, stream) {
    // Initialize states
    $scope.queued = false;
    $scope.playing = false;

    // Queue operations
    $scope.queue = function () {
      $scope.queued = true;
      $socket.emit('queue');
    };
    $scope.dequeue = function () {
      $scope.queued = false;
      $socket.emit('dequeue');
    };
    // Send server audio
    $scope.emit = function (packet) {
      $socket.emit('audio', packet);
    };
    // Stop transmission
    $scope.stop = function () {
      $scope.playing = false;
      $socket.emit('stop');
    };
    // Listen for transmission
    $socket.on('transmit', function (data) {
      $scope.playing = data;
      if ($scope.playing) $scope.queued = false;
    });
    // Listen for queue position
    $socket.on('queue', function (data) {
      $scope.place = data;
    });
  }]);
}(angular));
