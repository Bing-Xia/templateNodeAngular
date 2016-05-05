'use strict';

module.exports.init = function (express, app) {
  // routers to configure,  do not search folder node-app/router to dynamic register,
  // they are should in right order, for example: /static/lib and /static/others
  var routerM, routesModules = [
    './static/asset',
    './static/js',
    './static/view',
    './static/lib',
    './static/style.js',
    // static/others at the end of the sequence
    './static/others',
    './seo/seo.js'
  ];

  for (var i = 0, len = routesModules.length; i < len; i++) {
    routerM = require(routesModules[i]);
    var rootIsArray = Object.prototype.toString.call(routerM.root) === '[object Array]';
    var routerIsArray = Object.prototype.toString.call(routerM.router) === '[object Array]';
    if (!rootIsArray) {
      routerM.root = [routerM.root];
    }
    if (!routerIsArray) {
      routerM.router = [routerM.router];
    }
    for (var j = 0, rootLen = routerM.root.length; j < rootLen; j++) {
      app.use(
        routerM.root[j],
        routerM.interceptors && routerM.interceptors[j] || [],
        routerM.router[j] ? routerM.router[j](express) : routerM.router[routerM.router.length - 1](express));
    }
  }
};
