(function (angular) {
  "use strict";

  angular.module('commune')
  .factory('stream', ['$q', function($q) {
    // Promisify
    var deferred = $q.defer();

    // Get user audio
    var getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    getUserMedia = getUserMedia.bind(navigator);

    getUserMedia({audio: true},
      deferred.resolve.bind(deferred), deferred.reject.bind(deferred));

    return deferred.promise;
  }]);
}(angular));