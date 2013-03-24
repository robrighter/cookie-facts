The truth about when a browser reads and writes cookies
========================

Everything I always wanted to know about browser cookies but was too lazy to try.

Introduction
========================

I thought I understood browser cookie behavior. But, turns out I did'nt know all the various senarios in the various browsers. I started asking around to coworkers and friends questions like "Hey do you know if a browser sends a cookie to the server if....?" and it turns out most folks dont know either. The goal of this project is to identify the possible scenarios and create a working test for each one. 

This project does not include anywhere close to ALL the scenarios, so if you think of one please consider submitting a pull request.


Usage
=========================

To run the tests:

(1) Clone the repository locally:

	git clone git://github.com/robrighter/cookie-facts.git

(2) Install (Assumes you have installed node.js on your machine)

	cd cookie-facts
	npm install .

(3) Add the following line to your /etc/hosts file:

	127.0.0.1 demosite.com subdomain.demosite.com otherdemosite.com nevertypethisinaddressbar.com nevertypethisinaddressbar.demosite.com

(3) Run the server

	node server

(4) Open the following url in your web browser

	http://demosite.com:8081

	**note for best results clear all your cookies and history first

(5) Click the "Run All Scenarios" button on the top right of the page

(6) Approve any https security warnings while the test is running

(7) Run steps 4-7 for any browsers that you would like to test

Scenarios
=========================

A scenario in this project consists of an originating page/url on a client and its relationship to another page/url. In a scenario we attempt to both accept and send a cookie from the originating page/url to the other page/url.

<strong>Each scenario includes the following list of requests:</strong>


(1) HTML - HTML page view request

(2) CSS - CSS link tag request

(3) Script - Script tag request

(4) Javascript - On page javascript within a script tag

(5) Image - img tag request

(6) Iframe - iframe tag request

(7) XHR-Get - XHR Get Request

(8) XHR-Post - XHR Post Request

(9) XHR-Post-Cred - XHR Post Request with the <a href="https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Requests_with_credentials">xhr object's withCredentials flag</a>

(10) JSONP - Script tag added into dom request



<strong>The current list of scenarios are:</strong>

	(1) Same Domain Read

	(2) Same Domain Write

	(3) Sub-Domain Read

	(4) Sub-Domain Write

	(5) Other Domain Read

	(6) Other Domain Write

	(7) Other Domain that has never been in address-bar Read

	(8) Other Domain that has never been in address-bar Write

	(9) Https from Http Read

	(10) Https from Http Write

	(11) Http from Https Read

	(12) Http from Https Write

	(13) 404 response write

	(14) 500 resonse write

	(15) Subdomain that has never been in address-bar Read

	(16) Subdomain that has never been in address-bar Write

	(17) Other Domain that has never been in address-bar with p3p headers Read

	(18) Other Domain that has never been in address-bar with p3p headers Write


<strong>The list of scenarios that still need to be added:</strong><br >
<em>** pull requests welcome ;-)</em>

	(1) 302 response read

	(2) 302 response write

	(3) 301 response read

	(4) 301 response write

	(5) Other domain with proper cors headers read

	(6) Other domain with proper cors headers write

	(7) Other domain with proper cors headers that has never been in address bar read

	(8) Other domain with proper cors headers that has never been in address bar write

	(9) Subdomain with proper cors headers read

	(10) Subdomain with proper cors headers write

	(11) Subdomain with proper cors headers that has never been in address bar read

	(12) Subdomain with proper cors headers that has never been in address bar write

	(13) SecureOnly cookie https from http read

	(14) SecureOnly cookie https from http write

	(15) SecureOnly cookie http from https read

	(16) SecureOnly cookie http from https write


Sample Results
=======================

Results generated from The Cookie Facts:

<iframe style="width: 100%;height: 600px" src="http://robrighter.com/cookie-facts/public/static-results.html"></iframe>

