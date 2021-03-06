module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);

	function startRoute(req,res){
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		res.render('testpage', {
			testid: tid,
			write: true,
			xhrGetUrl: config.httpUrl + "/write-cookie/"+tid+"-xhr-get/yes",
			xhrPostUrl: config.httpUrl + "/write-cookie/"+tid+"-xhr-post/yes",
			xhrPostWithCredsUrl: config.httpUrl + "/write-cookie/"+tid+"-xhr-post-creds/yes",
			imageUrl: config.httpUrl + "/write-cookie-image/"+tid+"-image/yes",
			cssUrl: config.httpUrl + "/write-cookie-css/"+tid+"-css/yes",
			iframeUrl: config.httpUrl + "/write-cookie-html/"+tid+"-iframe/yes",
			jsonpUrl: config.httpUrl + "/write-cookie-script/"+tid+"-jsonp/yes",
			scriptUrl: config.httpUrl + "/write-cookie-script/"+tid+"-script/yes",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: config.httpUrl + '/verify-results/'
		})
	}

	return {
		testid: tid,
		name: 'Same Domain URL (write)',
		description: 'Attempts to set a cookie on the same domain.',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}