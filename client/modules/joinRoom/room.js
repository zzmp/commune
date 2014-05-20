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
    // Initialization
    $scope.queued = false;
    $scope.playing = false;

    // Start/end transmission on server request
    $socket.on('transmit', function (data) {
      $scope.playing = data;
      if ($scope.playing) $scope.queued = false;
    });

    // Get user audio
    stream.then(function(stream) {
      $scope.stream = stream;
    });

    // Queue operations
    $scope.queue = function () {
      $socket.emit('queue');
    };
    $scope.dequeue = function () {
      $socket.emit('dequeue');
    };

    // Stop transmission
    $scope.stop = function () {
      $scope.playing = false;
      $socket.emit('stop');
    };

    // Send server audio
    $scope.emit = function (packet) {
      $socket.emit('audio', packet);
    };
  }]);
}(angular));
