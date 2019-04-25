/* eslint-disable angular/controller-as */
(function () {
    'use strict';

    angular
        .module('angular')
        .controller('UserBoxController', UserBoxController);

    /** @ngInject */
    function UserBoxController($rootScope, $scope, $http, $log, $state, toastr, $cookies) {
        $scope.userList;
        $http.post("https://easy-mock.com/mock/5a3c66030df23b51b3614915/angular-less/kefu/msg/list").then(function (response) {
            var tempList = new Map();
            response.data.data.map(function (e) {
                tempList.set(e.content.userInfo.name, e.content.userInfo);

            })
            $scope.userList = Array.from(tempList.values());
            var loginUserName = $cookies.get("username");
            if (!$scope.userList.includes(loginUserName)) {
                $scope.userList.unshift({
                    name: loginUserName,
                    head: "/assets/images/default.png"
                })
            }

        })
    }
})();