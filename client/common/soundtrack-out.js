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
        var script = context.createScriptProcessor(256, 2, 2);
        // Create AnalyserNode for show
        var analyser = context.createAnalyser();

        // Start/stop audio processing
        var play = function () {
          source.connect(analyser);
          analyser.connect(script);
          script.connect(gain);
          gain.connect(context.destination);
          drawSound($scope, el, analyser);
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

        // Display packets
        var drawSound = function ($scope, el, analyser) {
          var svg = el.find('svg')[0];
          var path = el.find('path')[0];

          var bins = analyser.frequencyBinCount;
          var times = new Uint8Array(bins);
          analyser.getByteTimeDomainData(times);

          var d = 'M';
          for (var i = 0; i < bins; i+=50) {
            var val = times[i];
            var width = svg.clientWidth / bins;
            var percent = val / 256;
            var height = svg.clientHeight * percent;
            if (i === 0) d += (i * width) + ',' + height;
            else d += 'L' + (i * width) + ',' + height;
          }
          path.setAttribute('d', d);

          if ($scope.when)
            requestAnimationFrame(drawSound.bind(null, $scope, el, analyser));
        };

        // Register watch to start/stop audio processing
        $scope.$watch('when', function (val) {
          if (val && source) play();
          else stop();
        });
      }
    };
  }]);
}(angular));