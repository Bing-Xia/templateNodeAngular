'use strict';
define(function () {
  function fn() {
    return {
      restrict: 'E',
      scope: {
        history: '@'
      },
      templateUrl: '/static/views/directive/index/market.html',
      link: function (scope) {}
    };
  }
  return {
    name: 'market',
    $directiveFn: [fn]
  };
});
