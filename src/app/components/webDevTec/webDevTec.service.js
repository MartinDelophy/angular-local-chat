(function () {
  'use strict';

  angular
    .module('angular')
    .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
