var fs = require('fs');

module.exports.decorate = function(app,config,scenarios){

	/********************
	** LIST ALL ROUTES **
	*********************/
	var testResults = {};
	config.testResults = testResults;


	app.get('/', function(req,res){
		var resultTables = [];
		Object.keys(scenarios).forEach(function(key){
			var intro = "<p><strong>"+scenarios[key].name+"</strong><br />";
			intro += scenarios[key].description+"</p>";
			resultTables.push(intro+scenarios[key].generateResultsTable(testResults));
		});
		res.render('index',{
			title: 'Cookie Facts',
			testresults: resultTables,
			scenarios: scenarios
		});
	});

	app.get('/write-cookie/:key/:value', writeCookieKeyValue);
	app.post('/write-cookie/:key/:value', writeCookieKeyValue);
	function writeCookieKeyValue(req,res){
		res.cookie(req.params.key, req.params.value)
		var reply = {
			reply: 'wrote',
			key: req.params.key,
			value: req.params.value
		};
		if(req.query.hasOwnProperty('replywith')){
			res.send(req.query.replywith, reply);
		}
		else{
			res.send(reply);
		}
	}

	app.get('/write-cookie-html/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		if(req.query.hasOwnProperty('replywith')){
			res.statusCode = req.query.replywith;
		}
		res.render('htmlreply',{
			layout: false,
			reply: 'wrote',
			key: req.params.key,
			value: req.params.value
		});
	});

	app.get('/write-cookie-css/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		var body = "/* wrote "+req.params.key+" to "+req.params.value+"*/\n"+
			".reply{\n"+
			"     font-size: 10px;\n"+
			"}";
		if(req.query.hasOwnProperty('replywith')){
			res.statusCode = req.query.replywith;
		}
		res.setHeader('Content-Type', 'text/css');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});

	app.get('/write-cookie-script/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		var body = "//set the cookie\n" + " var "+req.params.key+" = "+req.params.value+";\n";
		if(req.query.hasOwnProperty('replywith')){
			res.statusCode = req.query.replywith;
		}
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});

	app.get('/write-cookie-image/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		var img = fs.readFileSync('./image.gif');
		if(req.query.hasOwnProperty('replywith')){
			res.statusCode = req.query.replywith;
		}
		res.setHeader('Content-Type', 'image/gif');
		res.end(img,'binary');
	});

	app.get('/read-cookie/:key', function(req,res){
		res.send({
			value: req.cookies[req.params.key]
		});
	});

	app.get('/read-cookie-record-result/:toread/:tid/:resultname', readCookieRecordResult);
	app.post('/read-cookie-record-result/:toread/:tid/:resultname', readCookieRecordResult);
	function readCookieRecordResult(req,res){
		var result = (req.cookies[req.params.toread] === req.params.tid) ? true : false;
		if( !(testResults[req.headers['user-agent']]) ){
			testResults[req.headers['user-agent']] = {};
		}
		testResults[req.headers['user-agent']][req.params.tid+req.params.resultname] = result;
		res.send({
			value: req.cookies[req.params.toread]
		});
	}

	app.post('/verify-results/', function(req,res){
		var expected = JSON.parse(req.body.expectedcookies);
		if(!testResults[req.headers['user-agent']]){
			testResults[req.headers['user-agent']] = {};
		}
		var results = testResults[req.headers['user-agent']];

		expected.forEach(function(item){
			results[item] = (req.cookies[item] === 'yes')? true : false;
		});
		res.redirect(302, config.httpUrl);
	});

	app.post('/verify-read-results/', function(req,res){
		var expected = JSON.parse(req.body.expectedcookies);
		if(!testResults[req.headers['user-agent']]){
			testResults[req.headers['user-agent']] = {};
		}
		var results = testResults[req.headers['user-agent']];
		expected.forEach(function(item){
			results[item] = results[item] ? true : false;
		});
		res.redirect(302, config.httpUrl);
	});


	Object.keys(scenarios).forEach(function(key){
		var toadd = scenarios[key].routes;
		toadd.forEach(function(route){
			app.get(route.pattern, route.callback);
		});
	});

}