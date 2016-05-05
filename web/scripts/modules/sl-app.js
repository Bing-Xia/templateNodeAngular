"use strict";
define(['interceptor/httpInterceptor',
    'filter/percentage',
    'directive/numberWithDecimals',
    'directive/summary',
    'directive/tab',
    'directive/market',
    'directive/sl-chart',
    'utils/Utils', 'angular', 'ngResource', 'ngRoute', 'ngCookies', 'ngLocalStorage', 'provider/routeResolver', 'angular.ui.bootstrap'
  ],
  function (httpInterceptor,
    percentage,
    numberWithDecimals,
    summary,
    tab,
    market,
    chart,
    Utils, angular) {
    var appName = "slApp";
    var app = angular.module(appName, ['ngResource', 'ngRoute', 'ngCookies', 'LocalStorageModule', 'routeResolverServices', 'ui.bootstrap']);
    // registe common components, controller, factory, service, filter, directive, interceptor
    Utils.registeComponents(app, [
      httpInterceptor,
      percentage,
      numberWithDecimals,
      summary,
      tab,
      market,
      chart
    ]);

    app.config(['$routeProvider', '$controllerProvider',
      '$compileProvider', '$filterProvider', '$provide', 'localStorageServiceProvider', '$httpProvider',
      function ($routeProvider, $controllerProvider,
        $compileProvider, $filterProvider, $provide, localStorageServiceProvider, $httpProvider) {

        app.register = {
          controller: $controllerProvider.register,
          directive: $compileProvider.directive,
          filter: $filterProvider.register,
          factory: $provide.factory,
          service: $provide.service
        };

        $httpProvider.defaults.headers.post = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        $httpProvider.defaults.headers.put = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        //参数转换
        $httpProvider.defaults.transformRequest = [Utils.transformRequest];

        //$httpProvider.defaults.xsrfCookieName = 'tk';
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.interceptors.push('httpInterceptorSvc');

        localStorageServiceProvider.prefix = 'AR-DR' + window.location.hostname;
      }
    ]);
    app.bootstrap = function () {
      angular.element(document).ready(function () {
        angular.bootstrap(document, [appName]);
      });
    };
    return app;
  });
