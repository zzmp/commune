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
    $scope.queue = 0;

    $socket.on('audio', function (packet) {
      $scope.packet = packet;
    });

    $scope.play = function () {
      $socket.emit('play');
      $scope.playing = true;
    };

    $socket.on('play', function (data) {
      if (!data) $scope.playing = false;
    });

    $socket.on('queue', function (data) {
      $scope.queue = data;
    });
  }]);
}(angular));
