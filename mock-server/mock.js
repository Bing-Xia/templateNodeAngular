var express = require('express'), bodyParser = require('body-parser');
var app = express();
var port = 8088;

app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); 
app.use(require('./middleware/cors.js'));

// Config Router
function configRouter(express, app) {
  var router = require('./router/router');
  router.init(express, app);
}

function createServer(app, port) {
  var server = require('http').createServer(app);
  server.listen(port, function () {
    console.info('Express mock server listening on port ' + port);
  });
}

configRouter(express, app);
createServer(app, port);