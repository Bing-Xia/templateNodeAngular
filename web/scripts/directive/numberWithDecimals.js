'use strict';
define(function () {
  function fn() {
    return {
      //
      //example
      //可以指定浮点数位数，如保留两位小数：<input number-with-decimals="2">
      //千位分隔 <input number-with-decimals="2" isamount="true">
      //百分比 <input number-with-decimals="4" ispercent="true">
      //
      require: '?ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        console.log(attrs, !!attrs.isamount);
        if (!ngModelCtrl) {
          return;
        }

        var numWDec = function (val) {
          if (angular.isUndefined(val)) {
            val = '';
          }
          var clean = val.replace(/[^0-9\.]/g, '');
          if (!!attrs.isamount) {
            clean = val.replace(/[^0-9\.]/g, '').replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
          }

          if (!!attrs.ispercent) {
            if (clean > 1 || clean < 0) {
              clean = '';
            }
          }

          var decimalCheck = clean.split('.');

          if (!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0, attrs.numberWithDecimals);
            clean = decimalCheck[0] + '.' + decimalCheck[1];
          }
          return clean;
        };

        ngModelCtrl.$formatters.push(function () {
          return numWDec(ngModelCtrl.$modelValue + '');
        });
        ngModelCtrl.$viewChangeListeners.push(function () {
          ngModelCtrl.$setViewValue(numWDec(ngModelCtrl.$modelValue + ''));
          ngModelCtrl.$render();
        });

      }
    };
  }
  return {
    name: 'numberWithDecimals',
    $directiveFn: fn
  };
});
