(function (angular) {
  "use strict";
  angular.module('commune.main', ['ngRoute', 'ngSocket', 'commune.main.note'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.tpl.html',
        controller: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('mainCtrl', ['$scope', '$socket', 'stream',
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
