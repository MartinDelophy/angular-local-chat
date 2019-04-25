// (function () {
'use strict';



angular.module('angular').directive('audioInMsgList', function (Utils) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      msg: "="

    },
    controller: "audioInMsgListController",
    template: "<div class=\"audio-in-msg-list\" ng-click=\"clickAudio()\">\n  <div ng-if=\"!playing\" class=\"glyphicon glyphicon-triangle-right\"></div>\n  <div ng-if=\"playing\" class=\"glyphicon glyphicon-option-horizontal\"></div>\n  <span ng-class=\"{'audio- seconds - left':float=='left'\n  ,'audio - seconds - right':float=='right'}\">{{msg.time}}s</span>\n  <audio ng-src=\"{{msg.otherurl}}\" style=\"display:none\"></audio>\n</div>",
    link: function (scope, element, attrs) {
      scope.uuidAudio = Utils.uuid();
      scope.playTime = 0;
      scope.playing = false;
      scope.audio = element.find('audio');


      //媒体载入触发事件
      $(scope.audio[0]).on('loadedmetadata', function () {
        if (!scope.msg.time) {
          scope.msg.time = Math.ceil(scope.audio[0].duration);
        }
      });
      $(scope.audio[0]).on('ended', function () {
        var limitTime = parseInt(scope.msg.time);
        setTimeout(function () {

          scope.$apply(function () {
            scope.playing = false;
          })
        }, limitTime);
      });


    }
  }
});
// })