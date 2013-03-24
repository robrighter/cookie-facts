module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.otherDomainNeverInAddressBarUrl;
	var p3p = encodeURIComponent('CP="CAO DSP AND SO ON" policyref="/w3c/p3p.xml", CP="NOI DSP COR CURa ADMa DEVa TAIa OUR BUS IND UNI COM NAV INT", policyref="/w3c/p3p.xml"');
	
	function readRoute(req,res){
		//read the cookie for the normal html request route
		if( !(config.testResults[req.headers['user-agent']]) ){
			config.testResults[req.headers['user-agent']] = {};
		}
		var htmlResult = (req.cookies['readable'] === tid)? true : false;
		config.testResults[req.headers['user-agent']][tid+'-html'] = htmlResult;
		
		res.render('testpage', {
			testid: tid,
			xhrGetUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-get?p3p="+p3p,
			xhrPostUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-post?p3p="+p3p,
			xhrPostWithCredsUrl: url + "/read-cookie-record-result/readable/"+tid+"/-xhr-post-creds?p3p="+p3p,
			imageUrl: url + "/read-cookie-record-result/readable/"+tid+"/-image?p3p="+p3p,
			cssUrl: url + "/read-cookie-record-result/readable/"+tid+"/-css?p3p="+p3p,
			iframeUrl: url + "/read-cookie-record-result/readable/"+tid+"/-iframe?p3p="+p3p,
			jsonpUrl: url + "/read-cookie-record-result/readable/"+tid+"/-jsonp?p3p="+p3p,
			scriptUrl: url + "/read-cookie-record-result/readable/"+tid+"/-script?p3p="+p3p,
			javascriptReadUrl: url + "/read-cookie-record-result/readable/"+tid+"/-javascript?p3p="+p3p,
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: config.httpUrl + '/verify-read-results/'
		})
	}

	function startRoute(req,res){
		var writeurl = url + '/write-cookie/readable/'+tid+"?p3p="+p3p;
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
		name: 'Other Domain Never In Address Bar with p3p headers (read)',
		description: 'Attempts to read a cookie on another unrelated domain with p3p headers that has never been in the address bar.',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid , callback: startRoute },
			{ pattern: '/' + tid + '/read', callback: readRoute }
		]
	};
}