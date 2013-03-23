The truth about when a browser reads and writes cookies
========================

Everything I always wanted to know about browser cookies but was too lazy to try.

Introduction
========================

I thought I understood browser cookie behavior. But, turns out I did'nt know all the various senarios in the various browsers. I started asking around to coworkers and friends questions like "Hey do you know if a browser sends a cookie to the server if....?" and it turns out most folks dont know either. The goal of this project is to identify the possible scenarios and create a working test for each one. 

This project does not include anywhere close to ALL the scenarios, so if you think of one please consider submitting a pull request.



Scenarios
=========================

A scenario in this project consists of an originating page/url on a client and its relationship to another page/url. In a scenario we attempt to both accept and send a cookie from th originating page/url to the other page/url.

In each scenario the following methods are attempted for reading and writing the cookie:

(1) HTML - HTML page view request

(2) CSS - CSS link tag request

(3) Script - Script tag request

(4) Javascript - On page javascript within a script tag

(5) Image - img tag request

(6) Iframe - iframe tag request

(7) XHR-Get - XHR Get Request

(8) XHR-Post - XHR Post Request

(9) XHR-Post-Cred - XHR Post Request with xhr object's "Send Credentials" flag

(10) JSONP - Script tag added into dom request


The current list of scenarios are:
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


