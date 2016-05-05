'use strict';

function router(express) {
    var router = express.Router();

    router.get('/robots.txt', function(req, res) {
        res.sendfile(global.AppConstant.SEOFolder.robots);
    });

    router.get('/sitemap.xml', function(req, res) {
        res.sendfile(global.AppConstant.SEOFolder.sitemap);
    });

    return router;
}
module.exports = {
    root: '/',
    router: router
};
