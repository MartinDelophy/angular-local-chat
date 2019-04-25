/* eslint-disable angular/on-watch */
/* eslint-disable angular/controller-as */
(function () {
    'use strict';

    angular
        .module('angular')
        .controller('ChatListController', ChatListController);

    /** @ngInject */
    /**
     * @description 该controller 用于解决交谈框出现的问题
     * @param {*} $rootScope 根结点
     * @param {*} $scope 当前组建节点
     * @param {*} $log 日志输出
     * @param {*} $http http请求
     */
    function ChatListController($rootScope, $scope, $log, $http, $timeout) {

        var navItemsPromise = $http.post("https://easy-mock.com/mock/5a3c66030df23b51b3614915/angular-less/kefu/msg/list");
        navItemsPromise.then(function (e) {
            $rootScope.chatRecords = e.data.data;
        });

        $scope.middleOffset = "'" + (angular.element(".chat-list").width() / 2 - 100) + "px'";

        //用scrollTop来置底
        $rootScope.$on("sendMessage", function () {
            var chatList = $(".chat-list").parent();
            $timeout(function () {
                $scope.$apply(function () {
                    chatList[0].scrollTop = $(".chat-list")[0].offsetHeight;
                })
            })
        })

    }
})();