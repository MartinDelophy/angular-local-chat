// (function () {
'use strict';
//上传图片
angular.module('angular')
    .controller('imgInMsgListController', ['$scope', '$timeout', '$interval', '$rootScope',
        function ($scope, $timeout, $interval, $rootScope) {
            $scope.mongolia = false;
            $scope.defaultIndex = 0;
            $scope.imgArrIndex = new Set();
            $scope.defaultSrc = "";
            updateIndex();

            function updateIndex() {
                $rootScope.chatRecords.map(function (e, index) {
                    if (e.content.body.type == "image") {
                        $scope.imgArrIndex.add(index);
                        if ($scope.src == e.content.body.message.url) {
                            $scope.defaultIndex = index;
                            $scope.defaultSrc = e.content.body.message.url;
                        }
                    }
                })

            }

            /*遮罩层*/
            function layout(flag) {
                var layout = $('<div class="snap-layout"></div>');
                if (flag) {

                    if ($('body').find('.snap-layout').length == 0) {
                        $('body').append(layout);
                    }
                } else {
                    $('body').find('.snap-layout').remove();
                }

                $('.snap-layout').click(function () {
                    $('body').find('.snap-layout').remove();
                    $timeout(function () {
                        $scope.mongolia = false;
                    })

                })
            }
            $scope.clickImg = function () {
                $scope.mongolia = true;
                $timeout(function () {
                    console.log($(".switcher"))
                })


                layout($scope.mongolia)
                updateIndex()
            }

            $scope.go = function (jud) {

                var setArr = Array.from($scope.imgArrIndex).sort();
                switch (jud) {
                    case "up":
                        for (var i = 0; i < setArr.length; i++) {
                            if (setArr[i] == $scope.defaultIndex && i != 0) {
                                $scope.defaultIndex = setArr[i - 1];
                                $scope.defaultSrc = $rootScope.chatRecords[$scope.defaultIndex].content.body.message.url;
                                break;
                            }
                        }

                        break;
                    case "down":
                        for (var j = 0; j < setArr.length; j++) {
                            if (setArr[j] == $scope.defaultIndex && j != setArr.length - 1) {
                                $scope.defaultIndex = setArr[j + 1];
                                $scope.defaultSrc = $rootScope.chatRecords[$scope.defaultIndex].content.body.message.url;
                                break;
                            }
                        }
                        break;
                }




            }

        }]);

// })