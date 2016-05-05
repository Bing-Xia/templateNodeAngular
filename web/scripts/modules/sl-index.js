"use strict";
require(['modules/sl-app'], function (app) {
  app.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
      when('/onMarket', {
        templateUrl: 'static/views/partials/index/index.html'
      }).
      when('/history', {
        templateUrl: 'static/views/partials/index/history.html'
      }).
      when('/notSure', {
        templateUrl: 'static/views/partials/index/notSure.html'
      }).
      when('/pay', {
        templateUrl: 'static/views/partials/index/pay.html'
      }).
      when('/paySuccess', {
        templateUrl: 'static/views/partials/index/paySuccess.html'
      }).
      otherwise({
        redirectTo: '/onMarket'
      });
    }
  ]);
  app.bootstrap();
});
