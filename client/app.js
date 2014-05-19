(function (angular) {
  "use strict";
  angular.module('commune', [
    'fx.animations',
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngCookies',
  'commune.join',
  'commune.host'])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });
}(angular));



