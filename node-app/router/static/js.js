'use strict';
var jsAuth = require('../../middleware/auth/jsAuth');
var rootPath = ['/static/scripts/controller', '/static/scripts/service'];
var staticOptions = global.AppConstant.staticFileOptions;

function generateRouter(staticPath) {
    return function router(express) {
        return express.static(staticPath, staticOptions);
    };
}

var router = rootPath.map(function(path) {
    return generateRouter(path.replace('static', 'web'));
});
module.exports = {
    // root url
    root: rootPath,
    interceptors: [jsAuth],
    router: router
};
