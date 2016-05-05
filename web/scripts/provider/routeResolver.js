'use strict';

define(['angular'], function (angular) {

  var routeResolver = function () {

    this.$get = function () {
      return this;
    };

    this.routeConfig = function () {
      var viewsDirectory = '/static/views/partials/',
        controllersDirectory = '/static/scripts/controller/',

        setBaseDirectories = function (viewsDir, controllersDir) {
          viewsDirectory = viewsDir;
          controllersDirectory = controllersDir;
        },

        getViewsDirectory = function () {
          return viewsDirectory;
        },

        getControllersDirectory = function () {
          return controllersDirectory;
        };

      return {
        setBaseDirectories: setBaseDirectories,
        getControllersDirectory: getControllersDirectory,
        getViewsDirectory: getViewsDirectory
      };
    }();

    this.route = function (routeConfig) {

      var resolve = function (path, baseName, attr) {
          if (!path) path = '';

          var routeDef = {};
          routeDef.templateUrl = routeConfig.getViewsDirectory() + path + '.html';
          routeDef.controller = baseName + 'Controller';
          routeDef.resolve = {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var dependencies = [routeConfig.getControllersDirectory() + path + '.js'];
              return resolveDependencies($q, $rootScope, dependencies);
            }]
          };
          var props = (arguments.length == 2 && typeof baseName === 'object') ? baseName : attr;
          if (props) {
            for (var p in props) {
              routeDef[p] = props[p];
            }
          }

          return routeDef;
        },

        resolveDependencies = function ($q, $rootScope, dependencies) {
          var defer = $q.defer();
          dependencies.unshift('modules/sl-app');
          require(dependencies, function (app, controller) {
            app.register.controller(controller.name, controller.$fn);
            defer.resolve();
            $rootScope.$apply()
          });
          return defer.promise;
        };

      return {
        resolve: resolve
      }
    }(this.routeConfig);

  };

  var servicesApp = angular.module('routeResolverServices', []);

  //Must be a provider since it will be injected into module.config()    
  servicesApp.provider('routeResolver', routeResolver);
});
