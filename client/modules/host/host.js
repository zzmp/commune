(function (angular) {
  "use strict";
  angular.module('commune.host', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/host', {
        templateUrl: 'modules/host/host.tpl.html',
        controller: 'hostCtrl'
      });
  })
  .controller('hostCtrl', ['$scope', '$http', function ($scope, $http) {
    // Authorization
    $scope.submit = function () {
      $http.post('/host', {
        room: $scope.roomname
      })
      .success(function () {

      })
      .error(function () {
        $scope.error = true;
        
      });
    };
  }]);
}(angular));
