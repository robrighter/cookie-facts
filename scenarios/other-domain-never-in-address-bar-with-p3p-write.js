module.exports = function(tid, config, scenarioHelper){
	
	var expectedCookies = scenarioHelper.makeExpectedCookiesList(tid);
	var url = config.otherDomainNeverInAddressBarUrl;

	function startRoute(req,res){
		
		var p3p = encodeURIComponent('CP="CAO DSP AND SO ON" policyref="/w3c/p3p.xml", CP="NOI DSP COR CURa ADMa DEVa TAIa OUR BUS IND UNI COM NAV INT", policyref="/w3c/p3p.xml"');
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		
		res.render('testpage', {
			testid: tid,
			write: true,
			xhrGetUrl: url + "/write-cookie/"+tid+"-xhr-get/yes?p3p="+p3p,
			xhrPostUrl: url + "/write-cookie/"+tid+"-xhr-post/yes?p3p="+p3p,
			xhrPostWithCredsUrl: url + "/write-cookie/"+tid+"-xhr-post-creds/yes?p3p="+p3p,
			imageUrl: url + "/write-cookie-image/"+tid+"-image/yes?p3p="+p3p,
			cssUrl: url + "/write-cookie-css/"+tid+"-css/yes?p3p="+p3p,
			iframeUrl: url + "/write-cookie-html/"+tid+"-iframe/yes?p3p="+p3p,
			jsonpUrl: url + "/write-cookie-script/"+tid+"-jsonp/yes?p3p="+p3p,
			scriptUrl: url + "/write-cookie-script/"+tid+"-script/yes?p3p="+p3p,
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: url + '/verify-results/'
		})
	}

	return {
		testid: tid,
		name: 'Other Domain Never In Address Bar with P3P Header (write)',
		description: 'Attempts to set a cookie on another unrelated domain with p3p headers set that has never been in the address bar. Note* you need to clear your history before running this test.',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: scenarioHelper.makeResultsParser(expectedCookies,tid),
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}