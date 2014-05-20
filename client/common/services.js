(function (angular) {
  "use strict";

  angular.module('commune')
  .factory('stream', ['$q', function($q) {
    // Promisify
    var deferred = $q.defer();

    // Get WebRTC API
    var getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    getUserMedia = getUserMedia.bind(navigator); // avoid `illegal invocation`

    // Capture user audio
    getUserMedia({audio: true},
      deferred.resolve.bind(deferred), deferred.reject.bind(deferred));

    return deferred.promise;
  }]);
}(angular));