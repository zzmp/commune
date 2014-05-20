(function (angular) {
  "use strict";

  angular.module('commune')
  .directive('soundtrackOut', function () {
    
    var AudioContext =
      window.AudioContext || window.webkitAudioContext;
    AudioContext = AudioContext.bind(window);
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'common/soundtrack-out.tpl.html',
      scope: {
        i: '=',
        o: '&',
        when: '='
      },
      link: function ($scope, el, attrs) {
        var source; // bound to i through $watch
        var context = new AudioContext();
        var gain = context.createGainNode();
        var record = context.createScriptProcessor(512, 2, 2);
        gain.gain.value = 0;

        record.addEventListener('audioprocess', function (stream) {
          var lChannel = stream.inputBuffer.getChannelData(0);
          var rChannel = stream.inputBuffer.getChannelData(1);

          // Clone channels; see:
          //   typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
          lChannel = new Float32Array(lChannel);
          rChannel = new Float32Array(rChannel);

          // Why complicate? Send it out:
          $scope.o({
            packet:{
              left: lChannel,
              right: rChannel
            }
          });
        });



        $scope.$watch('i', function (val) {
          if (val) source = context.createMediaStreamSource(val);
          if (source && $scope.when) {
            source.connect(record);
            record.connect(gain);
            gain.connect(context.destination);
          }
        });

        $scope.$watch('when', function (val) {
          if (source && val) {
            source.connect(record);
            record.connect(gain);
            gain.connect(context.destination);
          } else {
            gain.disconnect();
          }
        });
      }
    };
  });
}(angular));