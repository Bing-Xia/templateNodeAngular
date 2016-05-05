'use strict';
define(function () {
  function fn() {
    return {
      restrict: 'E',
      replace:true,
      scope: {},
      templateUrl: '/static/views/directive/index/tab.html',
      link: function(scope){
       
      }
    }
  }
  return {
    name: 'myTab',
    $directiveFn: [fn]
  };
});
