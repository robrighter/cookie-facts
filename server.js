var config = require('./config');
var express = require('express');
var fs = require('fs');
var https = require('https');
var http = require('http');
var app = express();

app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
require('./routes').decorate(app);

var serverOptions = {
	key: fs.readFileSync(__dirname +'/keys/fake.key'),	  	
	cert: fs.readFileSync(__dirname +'/keys/fake.crt')
};

var httpsServer = https.createServer(serverOptions, app).listen(config.sPort);
var httpServer = http.createServer(app).listen(config.port);

console.log('Starting http and https servers....');
console.log('servers up at:');
console.log(config.httpUrl);
console.log(config.httpsUrl);


