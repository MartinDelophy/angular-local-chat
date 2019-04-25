

(function () {
    'use strict';

    angular.module('filereceiver', [])
        .directive('fileback', ['$compile', feedbackDirective]);

    /**
     * 本指令用于切换语音状态，同时针对语音功能进行录制
     * @param {*} $compile 
     */

    function feedbackDirective($compile) {
        return {
            restrict: 'A',
            scope: {
                fileUrl: '=',//将指令内部scope字段和指令外部模块scope字段双向绑定  
            },
            link: function ($scope, element, attrs) {
                console.log("in")
                element.bind('click', function () {
                    var input = document.createElement("input");
                    input.type = "file";
                    $(input).click()
                    $(input).change(function (e) {
                        var reader = new FileReader();
                        reader.readAsDataURL(input.files[0]);//发起异步请求
                        reader.onload = function () {
                            if (input.files[0].type.indexOf("image") > -1) {
                                var that = this;
                                $scope.$apply(function () {
                                    $scope.fileUrl = that.result;
                                })
                                $scope.$root.$emit("receiveImg");
                            } else if (input.files[0].type.indexOf("audio") > -1) {
                                var that = this;
                                $scope.$apply(function () {
                                    $scope.fileUrl = that.result;
                                })
                                $scope.$root.$emit("receiveAudio");

                            } else if (input.files[0].type.indexOf("video") > -1) {
                                var that = this;
                                $scope.$apply(function () {
                                    $scope.fileUrl = that.result;
                                })
                                $scope.$root.$emit("receiveVideo");

                            } else {
                                alert("不支持的文件格式");
                            }
                            //读取完成后，数据保存在对象的result属性中
                        }
                    })
                });


            }
        }
    }


})();

