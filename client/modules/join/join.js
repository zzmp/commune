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
  .controller('joinCtrl', ['$scope', '$http', function ($scope, $http) {
    // Authorization
    $scope.submit = function () {
      $http.post('/join', {
        room: $scope.roomname,
        pass: $scope.password
      })
      .success(function () {
        // TODO
      })
      .error(function () {
        $scope.error = true;

      });
    };
  }]);
}(angular));
