/* eslint-disable angular/controller-as */
(function () {
  'use strict';

  angular
    .module('angular')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope, $scope, $log, $state, toastr, $http, $cookies) {
    // eslint-disable-next-line angular/controller-as
    $scope.input = {
      username: "",
      password: ""
    }

    $scope.clickLogin = function () {
      var ret = checkInput();
      if (ret) {
        toastr.error(ret, null, { preventDuplicates: false });
        return;
      }
      $cookies.put("username", $scope.input.username);
      $rootScope.user = {
        username: $scope.input.username
      };
      // $rootScope.$emit("welcome")
      toastr.info($cookies.get("username") + " 已进入房间");
      $state.go("home.main");

    }

    function checkInput() {
      if (!$scope.input.username) {
        return "请输入用户名";
      }
      if (!$scope.input.password) {
        return "请输入密码";
      }
      return "";
    }

  }
})();
