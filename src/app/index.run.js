(function () {
  'use strict';
  //启动程序入口
  angular
    .module('angular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
