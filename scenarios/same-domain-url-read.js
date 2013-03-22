module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);

	function readRoute(req,res){
		//read the cookie for the normal html request route
		if( !(config.testResults[req.headers['user-agent']]) ){
			config.testResults[req.headers['user-agent']] = {};
		}
		var htmlResult = (req.cookies['readable'] === tid)? true : false;
		config.testResults[req.headers['user-agent']][tid+'-html'] = htmlResult;
		
		res.render('testpage', {
			testid: tid,
			xhrGetUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-xhr-get",
			xhrPostUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-xhr-post",
			xhrPostWithCredsUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-xhr-post-creds",
			imageUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-image",
			cssUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-css",
			iframeUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-iframe",
			jsonpUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-jsonp",
			scriptUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-script",
			javascriptReadUrl: config.httpUrl + "/read-cookie-record-result/readable/"+tid+"/-javascript",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: config.httpUrl + '/verify-read-results/'
		})
	}

	function startRoute(req,res){
		res.cookie('readable', tid);
		res.redirect(302, config.httpUrl + '/' + tid + '/read');
	}

	return {
		testid: tid,
		name: 'Same Domain URL (read)',
		description: 'Attempts to read a cookie on the same domain.',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}