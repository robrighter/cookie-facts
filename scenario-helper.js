

function makeResultsParser(expectedCookies, tid){
	function generateResultsTable(results){
		var ret = '<table>';
		ret += makeTableHeader();
		for(key in results){
			ret+=makeTableRow(key, results[key]);
		}
		ret += '</table>';
		return ret;
	}

	function makeTableHeader(){
		var ret = "<tr><td>Browser</td>";
		expectedCookies.forEach(function(item){
			ret+="<td>"+(item.replace(tid+'-',''))+"</td>";
		});
		ret+="</tr>";
		return ret;
	}

	function makeTableRow(key, row){
		var ret = "<tr>";
		ret+= "<td>"+key+"</td>";
		expectedCookies.forEach(function(item){
			ret+=makeTableCell(row[item]);
		});
		ret += "</tr>";
		return ret;
	}

	function makeTableCell(value){
		var theclass = value ? 'pass' : 'fail';
		return "<td class='"+theclass+"''>"+value+"</td>";
	}

	return generateResultsTable;
}

function makeExpectedCookiesList(tid){
	return [
		tid + '-html',
		tid + '-css',
		tid + '-script',
		tid + '-javascript',
		tid + '-image',
		tid + '-iframe',
		tid + '-xhr',
		tid + '-jsonp'
	];
}

module.exports = {
	makeResultsParser: makeResultsParser,
	makeExpectedCookiesList: makeExpectedCookiesList
};