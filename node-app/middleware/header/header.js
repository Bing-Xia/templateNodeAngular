'use strict';
var middleware = function (req, res, next) {
  res.setHeader('X-Powered-By', global.AppConfig.basic.xPoweredBy);
  next();
};

module.exports = middleware;
