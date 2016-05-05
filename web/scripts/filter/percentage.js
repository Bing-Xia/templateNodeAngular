"use strict";
define(function () {
  function fn($filter) {
    //
    //example
    //
    //  <td>{{i.statistic | percentage:2}}</td>
    //
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }
  return {
    name: 'percentage',
    $filterFn: ["$filter", fn]
  };
});
