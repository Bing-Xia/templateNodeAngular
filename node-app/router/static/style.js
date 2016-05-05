'use strict';

var notAllowAccess = require('../../middleware/auth/notAllowAccess');
var rootPath = ['/static/styles/less', '/static/styles'];
var staticPath = global.AppConstant.FolderHierarchy.webBase + '/styles';
var staticOptions = global.AppConstant.staticLibOptions;

function router(express) {
    return express.static(staticPath, staticOptions);
}

module.exports = {
    // root url
    root: rootPath,
    interceptors: [notAllowAccess],
    router: router
};
