module.exports = {
	port: 8081,
	sPort: 8082,
	httpUrl: 'http://demosite.com:8081',
	httpsUrl: 'https://demosite.com:8082',
	subdomainHttpUrl: 'http://subdomain.demosite.com:8081',
	subdomainHttpsUrl: 'https://subdomain.demosite.com:8082',
	otherHttpUrl: 'http://otherdemosite.com:8081',
	otherHttpsUrl: 'https://otherdemosite.com:8082',
	otherDomainNeverInAddressBarUrl: 'http://nevertypethisinaddressbar.com:8081',
}


//Priority
// Same Domain - Done
// Sub Domain - Done
// Other Domain -Done
// https from http - Done
// http from https - Done
// other domain that has never been in address bar - Done
// 404 response
// 500 response
// 302 response
// 301 response
// other domain with cors
// sub domain with cors