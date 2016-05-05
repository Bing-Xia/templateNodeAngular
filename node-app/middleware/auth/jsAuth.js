'use strict';
// check user has permission access js file, otherwise user can view the backend URL path
var middleware = function(req,res,next) {
        next();
};
module.exports = middleware;