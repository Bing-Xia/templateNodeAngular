'use strict';
var Constant = {};
// /home/user/workspaces/template-nodejs-angular/node-app
var mainAppPath = process.cwd();
var path = require('path');
Constant.staticFileOptions = {
  maxAge: global.AppConfig.cache.maxAge || 0
};

Constant.staticLibOptions = {
  maxAge: global.AppConfig.cache.libMaxAge || 0
};

Constant.FolderHierarchy = {
  webBase: path.normalize(mainAppPath + '/../web'),
  viewBase: path.normalize(mainAppPath + '/../web/views'),
  nodeBase: path.normalize(mainAppPath + '/../node-app'),
};
Constant.SEOFolder = {
  robots: path.normalize(mainAppPath + '/../web/seo/robots.txt'),
  sitemap: path.normalize(mainAppPath + '/../web/seo/sitemap.xml')
};

// Configurations can accessed by web browser, subset of global.AppConfig
Constant.publicConfig = {
  env: {
    devMode: global.AppConfig.env.devMode,
    endpoint: global.AppConfig.env.endPoint
  }
};

module.exports = Constant;
