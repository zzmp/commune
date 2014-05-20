(function (angular) {
  "use strict";
  angular.module('commune', [
    'fx.animations',
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngCookies',
    'ngSocket',
  'commune.join',
  'commune.host'])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .controller('commune.nav', ['$scope', '$socket', function ($scope, $socket) {
    $scope.disconnect = function () {$socket.emit('leaveRoom');}
  }]);
}(angular));



