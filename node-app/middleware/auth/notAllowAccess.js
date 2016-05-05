'use strict';
// check user has permission access js file, otherwise user can view the backend URL path
var middleware = function(req,res) {
        res.sendStatus(403);
};
module.exports = middleware;