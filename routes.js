module.exports.decorate = function(app,connectionCollection){

	/********************
	** LIST ALL ROUTES **
	*********************/

	app.get('/', function(req,res){
		res.render('index',{title: 'Cookie Facts'});
	});

	app.get('/write-cookie/:key/:value', function(req,res){
		res.cookie(req.params.key, req.params.value)
		res.send({
			reply: 'wrote',
			key: req.params.key,
			value: req.params.value
		});
	});

	app.get('/read-cookie/:key', function(req,res){
		res.send({
			value: req.cookies[req.params.key]
		});
	});

}