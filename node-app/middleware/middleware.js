'use strict';

module.exports.init = function (express, app) {
  var middleware, middlewares = [
    '../middleware/header/header',
    '../middleware/platform/compatible',
    '../middleware/public/default'
  ];

  for (var i = 0, len = middlewares.length; i < len; i++) {
    middleware = require(middlewares[i]);
    app.use(middleware);
  }

  var favicon = require('serve-favicon');
  var compress = require('compression');
  var cookieParser = require('cookie-parser');
  app.use(favicon(global.AppConstant.FolderHierarchy.webBase+'/assets/image/favicon.ico'));
  app.use(cookieParser());
  app.use(compress());

}
