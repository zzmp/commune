(function (angular) {
  "use strict";

  angular.module('commune')
  .directive('soundtrackIn', function () {
    // Get Web Audio API
    var AudioContext =
      window.AudioContext || window.webkitAudioContext ||
      window.mozAudioContext || window.msAudioContext;
    AudioContext = AudioContext.bind(window); // avoid `illegal invocation`

    // Get Animation API
    var requestAnimationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    requestAnimationFrame = requestAnimationFrame.bind(window); // avoid `illegal invocation`

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
        // Create AnalyserNode for show
        var analyser = context.createAnalyser();

        // Decode packets
        script.addEventListener('audioprocess', function (stream) {
          var lChannel = stream.outputBuffer.getChannelData(0);
          var rChannel = stream.outputBuffer.getChannelData(1);

          for (var sample = 0; sample < 512; sample++) {
            lChannel[sample] = $scope.input.lChannel[sample];
            rChannel[sample] = $scope.input.rChannel[sample];
          }
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
          if (val) {
            script.connect(analyser);
            analyser.connect(context.destination);
            drawSound($scope, el, analyser);
          } else {
            script.disconnect();
            analyser.disconnect();
          }
        });
      }
    };
  });
}(angular));