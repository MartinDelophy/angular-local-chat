(function () {
  'use strict';
  //用于配置加载过滤器，模块指令
  angular
    .module('angular', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'screenshotFeedBack', 'audioRecorder', 'videoRecorder', 'filereceiver'])
    //过滤器 ，用于sendBox页面
    .filter('doneTo', function () {
      return function (h, m) {//参数 h 为|之前的数据，m 为过滤器之后的数据，如果数据为多个值，可以用:分开
        var f = [];
        for (var i = 0; i < m; i++) {
          f.push(i)
        }
        return f;
      }
    });

})();
