module.exports = function(config){

	var tid = 'same-domain-url-write';

	var expectedCookies = [
		'same-domain-url-write-html',
		'same-domain-url-write-css',
		'same-domain-url-write-script',
		'same-domain-url-write-javascript',
		'same-domain-url-write-image',
		'same-domain-url-write-iframe',
		'same-domain-url-write-xhr',
		'same-domain-url-write-jsonp'
	]

	function startRoute(req,res){
		//set the cookie for the normal html request route
		res.cookie(tid+'-html', 'yes')
		res.render('testpage', {
			testid: tid,
			xhrUrl: config.httpUrl + "/write-cookie/"+tid+"-xhr/yes",
			imageUrl: config.httpUrl + "/write-cookie-image/"+tid+"-image/yes",
			cssUrl: config.httpUrl + "/write-cookie-css/"+tid+"-css/yes",
			iframeUrl: config.httpUrl + "/write-cookie-html/"+tid+"-iframe/yes",
			jsonpUrl: config.httpUrl + "/write-cookie-script/"+tid+"-jsonp/yes",
			scriptUrl: config.httpUrl + "/write-cookie-script/"+tid+"-script/yes",
			expectedCookies: JSON.stringify(expectedCookies),
			verifyUrl: config.httpUrl + '/verify-write-results/'
		})
	}

	function generateResultsTable(results){
		var ret = '<h3>Same Domain URL (write)</h3><table>';
		ret += makeTableHeader();
		for(key in results){

		}
		ret += '</table>';
		return ret;
	}

	function makeTableHeader(){
		var ret = "<tr><td>Browser</td>";
		expectedCookies.forEach(function(item){
			ret+="<td>"+(item.replace(tid,''))+"</td>";
		});
		ret+="</tr>";
	}

	function makeTableRow(key, row){
		var ret = "<tr>";
		ret+= "<td>"+key+"</td>";
		expectedCookies.forEach(function(item){
			ret+="<td>"+(makeTableCell(row[item]))+"</td>";
		});
		ret += "</tr>";
		return ret;
	}

	function makeTableCell(value){
		var theclass = value ? 'pass' : 'fail';
		return "<td class='"+theclass+"''>"+value+"</td>";
	}

	return {
		testid: tid,
		name: 'Same Domain URL (write)',
		startUrl: config.httpUrl + '/' + tid,
		generateResultsTable: generateResultsTable,
		routes: [ 
			{ pattern: '/' + tid, callback: startRoute }
		]
	};
}