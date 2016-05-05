'use strict';
define(function () {
  function fn() {
    return {
      restrict: 'E',
      replace:true,
      scope: {},
      templateUrl: '/static/views/directive/index/summary.html',
      link: function(scope){
       
      }
    }
  }
  return {
    name: 'summary',
    $directiveFn: [fn]
  };
});
