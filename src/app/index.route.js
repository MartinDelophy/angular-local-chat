(function () {
  'use strict';

  angular
    .module('angular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'home'
      }).state('home.main', {
        url: '/main',
        views: {
          header: {
            templateUrl: 'app/main/header/header.html',
            controller: 'HeaderController'

          },
          userBox: {
            templateUrl: 'app/main/userBox/userBox.html',
            controller: 'UserBoxController'

          },
          chatList: {
            templateUrl: 'app/main/chatList/chatList.html',
            controller: 'ChatListController'
          },
          sendBox: {
            templateUrl: 'app/main/sendBox/sendBox.html',
            controller: 'SendBoxController'
          }
        }

      });


    $urlRouterProvider.otherwise('/login');
  }

})();
