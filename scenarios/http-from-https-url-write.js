module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.httpUrl;

	function startRoute(req,res){
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		
		res.render('testpage', {
			testid: tid,
			write: true,
			xhrGetUrl: url + "/write-cookie/"+tid+"-xhr-get/yes",
			xhrPostUrl: url + "/write-cookie/"+tid+"-xhr-post/yes",
			xhrPostWithCredsUrl: url + "/write-cookie/"+tid+"-xhr-post-creds/yes",
			imageUrl: url + "/write-cookie-image/"+tid+"-image/yes",
			cssUrl: url + "/write-cookie-css/"+tid+"-css/yes",
			iframeUrl: url + "/write-cookie-html/"+tid+"-iframe/yes",
			jsonpUrl: url + "/write-cookie-script/"+tid+"-jsonp/yes",
			scriptUrl: url + "/write-cookie-script/"+tid+"-script/yes",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: url + '/verify-results/'
		})
	}

	return {
		testid: tid,
		name: 'HTTP from HTTPs (write)',
		description: 'Attempts to set a cookie on an http url from an https url.',
		startUrl: config.httpsUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}