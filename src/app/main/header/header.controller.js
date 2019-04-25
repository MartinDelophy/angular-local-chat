/* eslint-disable angular/controller-as */
(function () {
    'use strict';

    angular
        .module('angular')
        .controller('HeaderController', HeaderController);
    /**
     * @description 优化了刷新后cookie中用户名消失的问题
     * @param {*} $log  日志
     * @param {*} $rootScope 跟节点
     * @param {*} $scope 局部作用
     * @param {*} $state 状态
     * @param {*} $cookies cookie
     */
    /** @ngInject */
    function HeaderController($log, $rootScope, $scope, $state, $cookies) {

        $scope.username = $cookies.get("username");
        $scope.logout = function () {
            if (confirm("确认退出？")) {
                $cookies.remove("token");
                $state.go("login");
            }
        }

    }
})();
