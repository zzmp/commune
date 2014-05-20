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
    // Initialization
    // $scope.transmit = false;

    // // Start/end transmission on server request
    // $socket.on('transmit', function (data) {
    //   $scope.transmit = data;
    //   $scope.$broadcast('transmit');
    // });

    // // Get user audio
    // stream.then(function(stream) {
    //   $scope.stream = stream;
    // });

    // // Send server audio
    // $scope.emit = function (packet) {
    //   $socket.emit('audio', packet);
    // };
  }]);
}(angular));
