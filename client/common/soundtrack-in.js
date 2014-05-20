(function (angular) {
  "use strict";

  angular.module('commune')
  .directive('soundtrackIn', function () {
    // Get Web Audio API
    var AudioContext =
      window.AudioContext || window.webkitAudioContext ||
      window.mozAudioContext || window.msAudioContext;
    AudioContext = AudioContext.bind(window); // avoid `illegal invocation`

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'common/soundtrack.tpl.html',
      scope: {
        input: '=',
        when: '='
      },
      link: function ($scope, el, attrs) {
        var context = new AudioContext();
        // Create AudioNode to decode packets
        var script = context.createScriptProcessor(512, 2, 2);

        // Decode packets
        script.addEventListener('audioprocess', function (stream) {
          var lChannel = stream.outputBuffer.getChannelData(0);
          var rChannel = stream.outputBuffer.getChannelData(1);

          for (var sample = 0; sample < 512; sample++) {
            lChannel[sample] = $scope.input.lChannel[sample];
            rChannel[sample] = $scope.input.rChannel[sample];
          }
        });

        // Register watch to start/stop audio processing
        $scope.$watch('when', function (val) {
          val ? script.connect(context.destination) : script.disconnect();
        });
      }
    };
  });
}(angular));