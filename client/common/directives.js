(function (angular) {
  "use strict";

  angular.module('commune')
  .directive('soundtrack', function () {
    
    var OfflineAudioContext =
      window.OfflineAudioContext || window.webkitOfflineAudioContext;
    OfflineAudioContext = OfflineAudioContext.bind(window);
    return {

    };
  });
}(angular));