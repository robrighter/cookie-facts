var express = require('express');
var fs = require('fs');
var https = require('https');
var http = require('http');
var httpsApp = express();
var httpApp = express();

httpsApp.use(app.router);
httpsApp.use(express.static(__dirname + '/public'));
httpsApp.set('views', __dirname + '/views');
httpsApp.set('view engine', 'jade');
require('./routes').decorate(httpsApp);

httpApp.use(app.router);
httpApp.use(express.static(__dirname + '/public'));
httpApp.set('views', __dirname + '/views');
httpApp.set('view engine', 'jade');
require('./routes').decorate(httpApp);

var serverOptions = {
	key: fs.readFileSync(__dirname +'keys/fake-ssl.key'),	  	
	cert: fs.readFileSync(__dirname +'keys/fake-ssl.crt')
};


var httpsServer = https.createServer(serverOptions, app).listen(8081);
var httpServer = http.createServer({}, app).listen(8081);

