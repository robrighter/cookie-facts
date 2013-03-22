module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.httpUrl;

	function startRoute(req,res){
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		
		res.render('testpage', {
			testid: tid,
			write: true,
			xhrGetUrl: url + "/write-cookie/"+tid+"-xhr-get/yes?replywith=500",
			xhrPostUrl: url + "/write-cookie/"+tid+"-xhr-post/yes?replywith=500",
			xhrPostWithCredsUrl: url + "/write-cookie/"+tid+"-xhr-post-creds/yes?replywith=500",
			imageUrl: url + "/write-cookie-image/"+tid+"-image/yes?replywith=500",
			cssUrl: url + "/write-cookie-css/"+tid+"-css/yes?replywith=500",
			iframeUrl: url + "/write-cookie-html/"+tid+"-iframe/yes?replywith=500",
			jsonpUrl: url + "/write-cookie-script/"+tid+"-jsonp/yes?replywith=500",
			scriptUrl: url + "/write-cookie-script/"+tid+"-script/yes?replywith=500",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: url + '/verify-results/'
		})
	}

	return {
		testid: tid,
		name: '500 Response (write)',
		description: 'Attempts to accept a cookie from a 500 response.',
		startUrl: url + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}