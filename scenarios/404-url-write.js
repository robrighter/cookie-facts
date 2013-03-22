module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.httpUrl;

	function startRoute(req,res){
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		
		res.render('testpage', {
			testid: tid,
			write: true,
			xhrGetUrl: url + "/write-cookie/"+tid+"-xhr-get/yes?replywith=404",
			xhrPostUrl: url + "/write-cookie/"+tid+"-xhr-post/yes?replywith=404",
			xhrPostWithCredsUrl: url + "/write-cookie/"+tid+"-xhr-post-creds/yes?replywith=404",
			imageUrl: url + "/write-cookie-image/"+tid+"-image/yes?replywith=404",
			cssUrl: url + "/write-cookie-css/"+tid+"-css/yes?replywith=404",
			iframeUrl: url + "/write-cookie-html/"+tid+"-iframe/yes?replywith=404",
			jsonpUrl: url + "/write-cookie-script/"+tid+"-jsonp/yes?replywith=404",
			scriptUrl: url + "/write-cookie-script/"+tid+"-script/yes?replywith=404",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: url + '/verify-results/'
		})
	}

	return {
		testid: tid,
		name: '404 Response (write)',
		description: 'Attempts to accept a cookie from a 404 response.',
		startUrl: url + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}