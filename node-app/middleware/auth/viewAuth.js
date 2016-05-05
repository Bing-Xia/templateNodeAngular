'use strict';
// check user has permission view html, avoid user can view others page in the browser
var middleware = function(req,res,next) {
        next();
};
module.exports = middleware;