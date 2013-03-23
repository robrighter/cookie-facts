module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.subdomainNeverInAddressBarUrl;

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
			verifyUrl: config.httpUrl + '/verify-read-results/'
		})
	}

	function startRoute(req,res){
		var writeurl = url + '/write-cookie/readable/'+tid;
		res.render('testpage', {
			testid: tid,
			xhrGetUrl: writeurl,
			xhrPostUrl: writeurl,
			xhrPostWithCredsUrl: writeurl,
			imageUrl: writeurl,
			cssUrl: writeurl,
			iframeUrl: writeurl,
			jsonpUrl: writeurl,
			scriptUrl: writeurl,
			expectedCookies: '"[]"',
			verifyUrl: '',
			jsRedirect: config.httpUrl + '/' + tid + '/read'
		});
	}

	return {
		testid: tid,
		name: 'Subdomain Never In Address Bar (read)',
		description: 'Attempts to read a cookie on a subdomain that has never been in the address bar.',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}