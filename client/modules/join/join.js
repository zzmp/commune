(function (angular) {
  "use strict";
  angular.module('commune.join', ['ngRoute', 'commune.join.room'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/join', {
        templateUrl: 'modules/join/join.tpl.html',
        controller: 'joinCtrl'
      })
      // Designate landing page
      .otherwise({
        redirectTo: '/join'
      });
  })
  .controller('joinCtrl', ['$scope', '$location', '$socket',
    function ($scope, $location, $socket) {
    // Authentication
    $scope.submit = function () {
      $socket.emit('joinRoom', {
        room: $scope.roomname,
        pass: $scope.password
      });
    };

    $socket.on('joinRoom', function (success) {
      if (success) {
        $location.url('join/' + $scope.roomname);
      } else {
        $scope.error = true;
      }
    });
  }]);
}(angular));
