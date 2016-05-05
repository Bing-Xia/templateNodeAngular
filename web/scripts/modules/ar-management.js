"use strict";
require(['modules/sl-app'], function (app) {

    app.run(['$cookies', '$location', '$rootScope', '$http', function ($cookies, $location, $rootScope, $http) {

      $rootScope.$on('$routeChangeSuccess', function (event, routeData) {
        $rootScope.pageTitle = (routeData.helpAlias ? routeData.helpAlias : '首页');
        //if (!$rootScope.getCookieUsername()) {
          //$location.url('/login');
        //}
      });
    }]);

    app.config(['$routeProvider', 'routeResolverProvider', 
      function ($routeProvider, routeResolverProvider) {

        var route = routeResolverProvider.route;

        $routeProvider
          .when('/customers', route.resolve('account/ar-manage/history', {
            helpAlias: 'AR Management Page',
            controller: 'ARHistoryController'
          }))
          .otherwise({
            redirectTo: '/customers'
          });
      }
    ]);
    app.bootstrap();
  });
