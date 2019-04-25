
'use strict';

angular.module('angular').directive('videoInMsgList', ['$rootScope', '$interval', 'Utils', '$timeout',
  function ($rootScope, $interval, Utils, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: "=",
        msg: "=?"
      },
      controller: "videoInMsgListController",
      //templateUrl: "/app/main/videoInMsgList/tpl.html",
      template: "<div class=\"video-in-msg-list\" ng-mouseenter=\"mouseEnter=true\" ng-mouseleave=\"mouseEnter=false\" ng-click=\"clickVideo()\">\n\n  <video>\n    <source ng-src=\"{{options.url}}\" type=\"video/mp4\">\n\n  </video>\n  <div class=\"control-bg\" ng-show=\"mouseEnter||!playing\" onselectstart=\"return false\" style=\"-moz-user-select:none;\">\n    <img class=\"control-btn\"\n      ng-src=\"{{!playing?'/app/assets/images/videoPlay.png':'/app/assets/images/videoPause.png'}}\"\n      ng-click=\"controlBtnClick()\" />\n\n  </div>\n</div>",
      link: function (scope, element, attrs) {
        scope.uuidVideo = Utils.uuid();

        scope.playing = false;
        scope.mouseEnter = false;
        scope.video = element.find('video');

        $(scope.video[0]).on('ended', function () {
          $timeout(function () {
            scope.playing = false;
          }, scope);
        });
        $(scope.video[0]).on('contextmenu', function () {
          return false;
        });
        // $(scope.video[0]).on('loadeddata', function () {
        //   if (scope.msg && scope.msg.captureThumbnail) {
        //     captureImage();
        //   }
        // });
        // function captureImage() {

        //   var canvas = document.createElement("canvas");
        //   canvas.width = scope.video[0].videoWidth;
        //   canvas.height = scope.video[0].videoHeight;
        //   canvas.getContext('2d')
        //     .drawImage(scope.video[0], 0, 0, canvas.width, canvas.height);

        //   canvas.toBlob(function (blob) {
        //     if(!blob){
        //       $toaster.error("视频读取失败！");
        //       scope.msg.msgStatus = "failure";
        //     }else{
        //       blob.name = "thumbnail.png";//需要起一个名字,否则上传的图片blob是一堆二进制数据;
        //       scope.$emit("newVideoThumbnail", {thumbnailBlob: blob, msg: scope.msg});
        //     }

        //     //var newImg = document.createElement("img"),
        //     //  url = URL.createObjectURL(blob);
        //     //
        //     //newImg.onload = function() {
        //     //  // no longer need to read the blob so it's revoked
        //     //  URL.revokeObjectURL(url);
        //     //};
        //     //
        //     //newImg.src = url;
        //     //document.body.appendChild(newImg);
        //   });

        //   //var img = document.createElement("img");
        //   //img.src = canvas.toDataURL();
        //   //var da=canvas.getImageData();
        //   //document.body.appendChild(img);
        // };

      }
    };
  }]);


