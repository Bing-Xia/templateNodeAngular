'use strict';
var viewAuth = require('../../middleware/auth/viewAuth');
var notAllowAccess = require('../../middleware/auth/notAllowAccess');
var rootPath = ['/static/views/layout', '/static/views/public', 'static/views'];
var staticOptions = global.AppConstant.staticFileOptions;

function router(express) {
  var staticPath = global.AppConstant.FolderHierarchy.webBase + '/views';
  return express.static(staticPath, staticOptions);
}

module.exports = {
  // root url
  root: rootPath,
  interceptors: [notAllowAccess, notAllowAccess, viewAuth],
  router: router
};
