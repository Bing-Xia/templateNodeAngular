'use strict';

var Utils = require('../../utils/Utils');

var middleware = function (req, res, next) {
  if (Utils.checkIfOldIE(req.get('User-Agent'), global.AppConfig.ieVersion)) {
    res.redirect('/public/out-of-date.html');
    return;
  }
  next();
};

module.exports = middleware;
