module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.otherHttpUrl;;

	function readRoute(req,res){
		//read the cookie for the normal html request route
		if( !(config.testResults[req.headers['user-agent']]) ){
			config.testResults[req.headers['user-agent']] = {};
		}
		var htmlResult = (req.cookies['readable'] === 'yes')? true : false;
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
		res.redirect(302, config.httpUrl + '/' + tid + '/read');
	}

	return {
		testid: tid,
		name: 'Other Domain URL (read)',
		description: 'Attempts to read a cookie on another unrelated domain.',
		startUrl: url + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}