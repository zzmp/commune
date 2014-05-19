angular.module('commune.create', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/create', {
      templateUrl: 'create/create.tpl.html',
      controller: 'createCtrl'
    });
})
.controller('createCtrl', function ($scope) {
  $scope.notes = [];
});