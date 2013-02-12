module.exports.decorate = function(app,connectionCollection){

	/********************
	** LIST ALL ROUTES **
	*********************/

	app.get('/', function(req,res){
		res.render('index',{title: 'Cookie Facts'});
	});


}