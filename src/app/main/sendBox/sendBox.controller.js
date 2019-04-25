/* eslint-disable angular/controller-as */
(function () {
    'use strict';

    angular
        .module('angular')
        .controller('SendBoxController', SendBoxController);


    /** @ngInject */
    function SendBoxController($rootScope, $scope, $log, $state, toastr, $cookies, $timeout) {
        $scope.input = {
            msg: ""
        };
        $scope.showemoji = false;
        $scope.chunkSize = 8;
        $scope.fileUrl = "";
        $scope.audioTime = 0;

        $scope.emoji = [
            "🐶", "🐱", "🐍", "😄", "😕", "😠", "😩", "😲", "😞", "😵", "😊", "😉", "😍", "😘",
            "😚", "😜", "😝", "😳", "😁", "😣", "😢", "😂", "😭", "😪", "😥", "😰", "😩", "🏠", " 🏫", " 🏨"
        ];

        $scope.send = function () {
            if (!$scope.input.msg) {
                toastr.info("请输入内容");
                return;
            }
            if (!$rootScope.chatRecords) $rootScope.chatRecords = [];
            var newMsg = {
                id: 1900,
                content: {
                    msgId: "pc" + new Date().getTime(),
                    userInfo: {
                        name: $cookies.get("username"),
                        userId: "1000_1578",
                        head:
                            "/assets/images/default.png",
                        userType: "pc"
                    },
                    body: {
                        message: $scope.input.msg,
                        type: "text"
                    }
                },
                createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                fromFans: true,
                cusName: "coco",

                msgType: "text",
                cusId: 1578
            };
            $rootScope.chatRecords.push(newMsg);
            $rootScope.$emit("sendMessage");
            var utterance = new SpeechSynthesisUtterance($scope.input.msg);
            utterance.lang = "zh-cn";
            speechSynthesis.speak(utterance);
            $scope.input.msg = "";
        };
        //shift + enter 触发消息发送机制
        angular.element(".form-control")[0].onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13 && e.shiftKey) { // enter 键
                $timeout(function () {
                    $scope.send();
                })
            }

        };

        $scope.clear = function () {
            $rootScope.chatRecords = []
        }

        /**
         * @description 显示提示框
         */
        $scope.showTip = function (e) {
            $timeout(function () {
                var p = angular.element(".tool-tip")[0];
                p.style.visibility = "visible";
                p.style.left = parseInt(e.clientX - 30) + "px";
                p.innerHTML = e.currentTarget.alt;
            })

        }
        /***
         * @description 隐藏提示框
         */
        $scope.hideTip = function () {
            $timeout(function () {
                var p = angular.element(".tool-tip")[0];
                p.style.visibility = "hidden";
            })

        }
        $scope.recall = function () {
            var records = $rootScope.chatRecords;
            if (records[records.length - 1].content.userInfo.name == $cookies.get("username")) {
                records.pop();
                $rootScope.chatRecords.push({
                    id: 1900,
                    content: {
                        msgId: "pc" + new Date().getTime(),
                        userInfo: {
                            name: "Administrator",
                            userId: "1000_1578",
                            head:
                                "/assets/images/default.png",
                            userType: "pc"
                        },
                        body: {
                            message: $cookies.get("username") + " 在" + moment().format("YYYY-MM-DD HH:mm:ss") + " 撤回了一条消息",
                            type: "text"
                        }
                    },
                    createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    fromFans: true,
                    cusName: "coco",

                    msgType: "recall",
                    cusId: 1578
                })
            }


        }

        $scope.switchEmojo = function () {
            $scope.showemoji = !$scope.showemoji;
        }
        $scope.appendEmoji = function (emo) {
            $scope.input.msg += emo;
            $scope.showemoji = false;
        }

        $rootScope.$on("receiveImg", function (e) {

            $rootScope.$apply(function () {

                $rootScope.chatRecords.push(
                    {
                        id: 1900,
                        content: {
                            msgId: "pc" + new Date().getTime(),
                            userInfo: {
                                name: $cookies.get("username"),
                                userId: "1000_1578",
                                head:
                                    "/assets/images/default.png",
                                userType: "pc"
                            },
                            body: {
                                "message": {
                                    "url": $scope.fileUrl
                                },
                                "type": "image"
                            }
                        },
                        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        fromFans: true,
                        cusName: "coco",

                        msgType: "image",
                        cusId: 1578
                    }
                )
                $rootScope.$emit("sendMessage")

            })


        })

        $rootScope.$on("receiveAudio", function () {
            $timeout(function () {
                $rootScope.chatRecords.push(
                    {
                        id: 1900,
                        content: {
                            msgId: "pc" + new Date().getTime(),
                            userInfo: {
                                name: $cookies.get("username"),
                                userId: "1000_1578",
                                head:
                                    "/assets/images/default.png",
                                userType: "pc"
                            },
                            body: {
                                message: {
                                    time: $scope.audioTime,
                                    otherurl: $scope.fileUrl,
                                    format: "mp3",
                                    url: $scope.fileUrl
                                },
                                type: "voice"
                            }
                        },
                        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        fromFans: true,
                        cusName: "coco",
                        msgType: "voice",
                        cusId: 1578
                    }
                )
                $rootScope.$emit("sendMessage")
            }, 1000)






        })
        $rootScope.$on("receiveVideo", function () {
            $timeout(function () {
                $rootScope.chatRecords.push(
                    {
                        id: 1900,
                        content: {
                            msgId: "pc" + new Date().getTime(),
                            userInfo: {
                                name: $cookies.get("username"),
                                userId: "1000_1578",
                                head:
                                    "/assets/images/default.png",
                                userType: "pc"
                            },
                            body: {
                                message: {
                                    time: 0,
                                    thumbnailUrl: "https://image-c.weimobwmc.com/kf/1b04393bf6034f648c7ba4bbe1acff67.jpg",
                                    format: "mp4",
                                    url: $scope.fileUrl
                                },
                                type: "video"
                            }
                        },
                        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        fromFans: true,
                        cusName: "coco",
                        msgType: "video",
                        cusId: 1578
                    }
                )
                $rootScope.$emit("sendMessage")
            }, 1000)
        })
    }

})();