(function (angular) {
  "use strict";
  angular.module('commune.join', ['ngRoute', 'ngSocket'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/join', {
        templateUrl: 'join/join.tpl.html',
        controller: 'joinCtrl'
      })
      // Designate landing page
      .otherwise({
        redirectTo: '/join'
      });
  })
  .controller('joinCtrl', ['$scope', '$socket', 'stream',
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
