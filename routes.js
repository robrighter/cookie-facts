var fs = require('fs');

module.exports.decorate = function(app,config,scenarios){

	/********************
	** LIST ALL ROUTES **
	*********************/
	var testResults = {};


	app.get('/', function(req,res){
		var resultTables = [];
		Object.keys(scenarios).forEach(function(key){
			resultTables.push(scenarios[key].generateResultsTable(testResults));
		});
		res.render('index',{title: 'Cookie Facts', testresults: resultTables});
	});

	app.get('/write-cookie/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		res.send({
			reply: 'wrote',
			key: req.params.key,
			value: req.params.value
		});
	});

	app.get('/write-cookie-html/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
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
		res.setHeader('Content-Type', 'text/css');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});

	app.get('/write-cookie-script/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		var body = "//set the cookie\n" + " var "+req.params.key+" = "+req.params.value+";\n";
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});

	app.get('/write-cookie-image/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		var img = fs.readFileSync('./image.gif');
		res.setHeader('Content-Type', 'image/gif');
		res.end(img,'binary');
	});

	app.get('/read-cookie/:key', function(req,res){
		res.send({
			value: req.cookies[req.params.key]
		});
	});

	app.post('/verify-write-results/', function(req,res){
		var expected = JSON.parse(req.body.expectedcookies);
		var results = {};
		expected.forEach(function(item){
			console.log('the Cookies are:');
			console.log(req.cookies);
			console.log(item + ' is ' + req.cookies[item]);
			results[item] = (req.cookies[item] === 'yes')? true : false;
		});
		testResults[req.headers['user-agent']] = results;
		console.log(testResults);
		res.redirect(302, config.httpUrl);
	});


	Object.keys(scenarios).forEach(function(key){
		var toadd = scenarios[key].routes;
		toadd.forEach(function(route){
			app.get(route.pattern, route.callback);
		});
	});

}