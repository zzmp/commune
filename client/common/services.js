(function (angular) {
  "use strict";

  angular.module('commune')
  .factory('stream', [function() {
    // Helper functions for audio capture
    var stream;
    // Error handling for user's refusing audio connection
    var mute = function () {
      stream = null;
      console.log('Audio capture failed.');
    };

    // Get user audio
    var getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    getUserMedia = getUserMedia.bind(navigator);

    return function(obj) {
      if (stream === undefined) {
        var talk = function (data) {
          stream = data;
          obj = stream;
        };
        getUserMedia({audio: true}, talk, mute);
      } else obj = stream;
    };
  }]);
}(angular));