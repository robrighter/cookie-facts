The truth about Cookies
========================

Everything I always wanted to know about browser cookies but was too lazy to try the scenarios.

Introduction
========================

I thought I understood browser cookie behavior. But, turns out I'm clueless of all the various senarios and how they played out in the various browsers. I started asking around to coworkers and friends questions like "Hey do you know if a browser sends a cookie to the server if....?" and it turns out most folks dont know either. The goal of this project is to identify all possible scenarios and create a working test for each one.



Scenarios
=========
<table>
	<tr>
		<td>Same Domain url (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<td>Same Domain url (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<td>Cross-subdomain url (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<td>Cross-subdomain url (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>Cross-domain url (without CORS) (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>Cross-domain url (without CORS) (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>Cross-domain url (with CORS) (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>Cross-domain url (with CORS) (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>302 Redirect (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>302 Redirect (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>301 Redirect (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>301 Redirect (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>404 page (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>404 Page (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>500 Page (Send Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
	<tr>
		<tr>
		<td>500 Page (Accept Cookies)</td>
		<td>XHR</td>
		<td>Script Tag/JSONP</td>
		<td>Meta Link (css)</td>
		<td>Image Tag</td>
		<td>Iframe</td>
	</tr>
</table>



