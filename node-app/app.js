'use strict';

// Config Router
function configMiddleware(express, app) {
  var middleware = require('./middleware/middleware');
  middleware.init(express, app);
}
// Config Router
function configRouter(express, app) {
  var router = require('./router/router');
  router.init(express, app);
}
// Config Express
function configExpress(app, swig) {
  app.set('trust proxy', true);
  app.set('view engine', 'html');
  app.engine('html', swig.renderFile);
  app.set('views', __dirname + '/web/views/');
}
// Config Swig
function configSwig(swig) {
  if (!swig) {
    return;
  }
  var swigFilters = require('./middleware/swig/filter');
  var options = {
    //override default open/close tag for variables, conflicts with angular
    varControls: ['{=', '=}'],
    cache: global.AppConfig.env.devMode ? false : 'memory'
  };
  // Custom Swig Filters
  for (var name in swigFilters) {
    swig.setFilter(name, swigFilters[name]);
  }
  swig.setDefaults(options);
}

function createServer(app) {
  var isSSL = global.AppConfig.basic.enableSSL,
    port = global.AppConfig.basic.port,
    devMode = global.AppConfig.env.devMode,
    options;
  if (isSSL) {
    var fs = require('fs'),
      path = './config/ssl/';
    options = {
      key: fs.readFileSync(path + 'key.pem'),
      cert: fs.readFileSync(path + 'cert.pem')
    };
  }

  var server;
  if (isSSL) {
    server = require('https').createServer(options, app);
  } else {
    server = require('http').createServer(app);
  }
  server.listen(port, function () {
    console.info('Express server[' + (devMode ? 'development' : 'production') + ' mode] listening on port ' + (isSSL ? '(SSL enabled)' : '') + port);
  });
}

(function logError() {
  process.on('uncaughtException', function (err) {
    console.log(('uncaughtException: ' + err).red);
  });
  process.on('unhandledRejection', function (reason, p) {
    // application specific logging, throwing an error, or other logic here
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
  });
})();

var express = require('express'),
  swig = require('swig');
// bootstrap app
(function (express, swig, global) {
  var app = express();
  var Config = require('./config/config');
  var Utils = require('./utils/Utils');
  Config.init().then(function (configs) {
    // save config into global
    global.AppConfig = configs;
    // keep the AppConfig as the orignal value, not allowed to modify
    Utils.deepFreeze(global.AppConfig);
    // App Cnstant depend on AppConfig, save constant into global
    global.AppConstant = require('./constant/Constant');
    
    configSwig(swig);
    configExpress(app, swig);
    configMiddleware(express, app);
    configRouter(express, app);
    createServer(app);
  }).catch(function (defaultPropertiesError, localPropertiesError) {
    throw new Error('Cannot load configurations: ' + defaultPropertiesError + localPropertiesError);
  });
})(express, swig, global);
