

(function () {
    'use strict';

    angular.module('videoRecorder', [])
        .directive('videoback', ['$compile', feedbackDirective]);

    /**
     * 本指令用于切换语音状态，同时针对语音功能进行录制
     * @param {*} $compile 
     */

    function feedbackDirective($compile) {
        return {
            restrict: 'A',
            scope: {
                videoUrl: '=',//将指令内部scope字段和指令外部模块scope字段双向绑定  
            },
            link: function ($scope, element, attrs) {
                $scope.playing = false;
                $scope.video = document.createElement("video");
                $scope.video.style.display = "none";

                $scope.stream = null;

                $scope.recorder = null;
                element.bind('click', function () {
                    console.log("点击了视频设备")
                    $scope.playing = !$scope.playing;
                    if (!$scope.playing) {
                        element[0].src = "/assets/images/video.png";
                        element[0].alt = "开始录制";
                        $scope.recorder.stop();

                        for (var i = 0; i < $scope.stream.getTracks().length; i++) {
                            $scope.stream.getTracks()[i].stop();
                        }


                    } else {
                        element[0].src = "/assets/images/video_on.png";
                        element[0].alt = "正在录制";
                        navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 400, height: 600 } })
                            .then(function (stream) {
                                $scope.stream = stream;
                                $scope.recorder = new MediaRecorder(stream);
                                $scope.video.srcObject = stream;
                                $scope.video = function () {
                                    console.log(arguments);
                                }
                                $scope.recorder.ondataavailable = function (event) {
                                    var url = URL.createObjectURL(event.data);
                                    $scope.videoUrl = url;
                                    $scope.$root.$emit("receiveVideo");

                                }
                                $scope.recorder.start();
                            });
                    }
                });


            }
        }
    }


})();

