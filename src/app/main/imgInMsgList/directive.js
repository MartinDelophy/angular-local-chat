// (function () {
'use strict';



angular.module('angular').directive('imgInMsgList', function (Utils) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            src: "="

        },
        controller: "imgInMsgListController",
        template: "<div>\n    <img class=\"msg-image\" ng-src=\"{{src}}\" alt=\"\" ng-click=\"clickImg()\">\n    <div ng-if=\"mongolia\">\n        <img class=\"image-zoom\" ng-src=\"{{defaultSrc}}\" alt=\"\">\n        <img class=\"base-icon lefter\" src=\"/assets/images/left_b.png\" ng-click=\"go('up')\" alt=\"向前\">\n        <img class=\"base-icon righter\" src=\"/assets/images/right_b.png\" ng-click=\"go('down')\" alt=\"向后\">\n    </div>\n</div>",

        link: function (scope, element, attrs) {

        }
    }
});
// })