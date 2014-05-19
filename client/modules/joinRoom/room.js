(function (angular) {
  "use strict";
  angular.module('commune.join.room', ['ngRoute'])
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
    $scope.transmit = false;

    // Start/end transmission on server request
    $socket.on('transmit', function (data) {
      $scope.transmit = data;
      $scope.$broadcast('transmit');
    });

    // Get user audio
    stream($scope.stream);

    // Send server audio
    this.emit = function (packet) {
      console.log(packet);
    };
  }]);
}(angular));
