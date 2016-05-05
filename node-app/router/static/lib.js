'use strict';
var rootPath = '/static/lib';
var staticPath = global.AppConstant.FolderHierarchy.webBase+ rootPath.replace('/static', '');
var staticOptions = global.AppConstant.staticLibOptions;

function router(express) {
    return express.static(staticPath, staticOptions);
}

module.exports = {
    // root url
    root: rootPath,
    router: router
};
