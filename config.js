module.exports = {
	port: 8081,
	sPort: 8082,
	httpUrl: 'http://demosite.com:8081',
	httpsUrl: 'https://demosite.com:8082',
	subdomainHttpUrl: 'http://subdomain.demosite.com:8081',
	subdomainHttpsUrl: 'https://subdomain.demosite.com:8082',
	otherHttpUrl: 'http://otherdemosite.com:8081',
	otherHttpsUrl: 'https://otherdemosite.com:8082'
}


//Priority
// Same Domain - Done
// Sub Domain - Done
// Other Domain -Done
// https from http
// http from https
// other domain that has never been in address bar
// 404 response
// 500 response
// 302 response
// 301 response
// other domain with cors
// sub domain with cors