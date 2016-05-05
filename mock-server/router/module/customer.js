'use strict';
function router(express) {
    var router = express.Router();
    // root + path --> /user/query
    router.get('/query', function(req, res) {
        console.log(req);
        return res.json({
            "result": "error",
            "content": {
                "apiReturn": {
                    name: 'query'
                }
            },
            "errors": [

            ],
            "messages": []
        });
    });

    router.post('/search', function(req, res) {
        console.log(req);
        return res.json({
            "result": "error",
            "content": {
                "apiReturn": {
                    name: 'query'
                }
            },
            "errors": [

            ],
            "messages": []
        });
    });

    return router;
}

module.exports = {
    // root url
    root: '/help',
    router: router
};
