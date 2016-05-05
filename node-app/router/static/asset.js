'use strict';
var assetAuth = require('../../middleware/auth/assetAuth');
var rootPath = '/static/assets';
var staticPath = global.AppConstant.FolderHierarchy.webBase+ rootPath.replace('/static', '');

var staticOptions = global.AppConstant.staticFileOptions;

function router(express) {
    return express.static(staticPath, staticOptions);
}

module.exports = {
    // root url
    root: '/static/assets',
    interceptors: [assetAuth],
    router: router
};
