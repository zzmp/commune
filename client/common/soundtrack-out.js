(function (angular) {
  "use strict";

  angular.module('commune')
  .directive('soundtrackOut', ['stream', function (stream) {
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
        output: '&',
        when: '='
      },
      link: function ($scope, el, attrs) {
        var source; // MediaElementSource
        var context = new AudioContext();
        // Create GainNode to mute feedback
        var gain = context.createGainNode();
        // Create AudioNode to encode packets
        var script = context.createScriptProcessor(512, 2, 2);
        // Start/stop audio processing
        var play = function () {
          source.connect(script);
          script.connect(gain);
          gain.connect(context.destination);
        };
        var stop = function () {
          gain.disconnect(context.destination);
        };

        // Capture user audio
        stream.then(function(stream) {
          if (stream) source = context.createMediaStreamSource(stream);
          if (source && $scope.when) play();
        });

        // Set gain to mute
        gain.gain.value = 0;

        // Encode audio
        script.addEventListener('audioprocess', function (stream) {
          var lChannel = stream.inputBuffer.getChannelData(0);
          var rChannel = stream.inputBuffer.getChannelData(1);

          // Clone channels, see:
          //   typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
          lChannel = new Float32Array(lChannel);
          rChannel = new Float32Array(rChannel);

          // Transmit packet to server:
          $scope.output({
            packet:{
              lChannel: lChannel,
              rChannel: rChannel
            }
          });
        });

        // Register watch to start/stop audio processing
        $scope.$watch('when', function (val) {
          if (val && source) play();
          else stop();
        });
      }
    };
  }]);
}(angular));