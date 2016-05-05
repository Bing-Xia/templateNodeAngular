'use strict';
var staticPath = global.AppConstant.FolderHierarchy.webBase;
var staticOptions = global.AppConstant.staticFileOptions;

function router(express) {
    return express.static(staticPath, staticOptions);
}

module.exports = {
    root: '/static',
    router: router
};
