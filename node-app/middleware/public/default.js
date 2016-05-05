'use strict';

var middleware = function (req, res, next) {
  //  /public/account/ar-management.html?a=1&b=2
  //  /public/account/ar-management.html
  var baseUrl = req.originalUrl;
  // Home Page
  if(baseUrl === '/'){
    baseUrl = '/public/index.html';
  }
  
  if (baseUrl.indexOf('/public') === 0) {
    baseUrl = baseUrl.replace(/[\?\#].*$/, '');
    res.render(global.AppConstant.FolderHierarchy.viewBase+baseUrl, {
        AppConfig: global.AppConstant.publicConfig
    });
  } else {
    next();
  }
};

module.exports = [middleware];
