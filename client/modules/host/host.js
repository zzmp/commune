(function (angular) {
  "use strict";
  
  angular.module('commune.host', ['ngRoute', 'commune.host.room'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/host', {
        templateUrl: 'modules/host/host.tpl.html',
        controller: 'hostCtrl'
      });
  })
  .controller('hostCtrl', ['$scope', '$location', '$socket',
    function ($scope, $location, $socket) {
    // Create a room
    $scope.submit = function () {
      $socket.emit('createRoom', {
        room: $scope.roomname,
        pass: $scope.password
      });
    };
    // Listen for server response
    $socket.on('createRoom', function (success) {
      if (success) {
        $location.url('host/' + $scope.roomname);
      } else {
        $scope.error = true;
      }
    });
  }]);
}(angular));
