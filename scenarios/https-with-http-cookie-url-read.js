module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.httpsUrl;

	function readRoute(req,res){
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
		res.redirect(302, url + '/' + tid + '/read');
	}

	return {
		testid: tid,
		name: 'HTTPS page with originating requests on HTTPS reading cookie set on HTTP',
		description: 'Writes a cookie on an https request, then serves a page on https and tries to have dependant requests read the cookie on an http url',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}