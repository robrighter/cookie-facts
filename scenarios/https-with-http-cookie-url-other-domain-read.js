module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);

	function readRoute(req,res){
		var url = config.otherHttpUrl;
		//read the cookie for the normal html request route
		if( !(config.testResults[req.headers['user-agent']]) ){
			config.testResults[req.headers['user-agent']] = {};
		}
		var htmlResult = (req.cookies['readable'] === tid)? true : false;
		config.testResults[req.headers['user-agent']][tid+'-html'] = htmlResult;
		
		res.render('testpage', {
			testid: tid,
			xhrGetUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-get",
			xhrPostUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-post",
			xhrPostWithCredsUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-post-creds",
			imageUrl: url + "/read-cookie-record-result/readable/"+tid+"/-image",
			cssUrl: url + "/read-cookie-record-result/readable/"+tid+"/-css",
			iframeUrl: url + "/read-cookie-record-result/readable/"+tid+"/-iframe",
			jsonpUrl: url + "/read-cookie-record-result/readable/"+tid+"/-jsonp",
			scriptUrl: url + "/read-cookie-record-result/readable/"+tid+"/-script",
			javascriptReadUrl: url + "/read-cookie-record-result/readable/"+tid+"/-javascript",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: url + '/verify-read-results/'
		})
	}

	function startRoute(req,res){
		res.cookie('readable', tid);
		res.redirect(302, config.httpsUrl + '/' + tid + '/read');
	}

	return {
		testid: tid,
		name: 'Read third party cookie from https to http',
		description: 'Writes a cookie on an http request on an other domain, then serves a page on the home https url and tries to have dependant requests read the cookie on the other domains https url',
		startUrl: config.otherHttpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}