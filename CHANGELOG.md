CHANGELOG
=========

* 2006	
	* This was the first version written just to prove a point and tested for 1 year on medium traffic site selling ads and collection stats. It was ugly, but it worked well enough.


* 2012-11-07
	* Introduced AJAX + JSON in 2linesads.js. Before there was a separate PHP script that generated the javascript call. Now it does not work in IE7 and less. Not a problem, really.
	* This is the first published version.


* 2012-11-10
	* Fixed some mismatches and typos in the code. 
	* Keyword in 2linesads mysql table has became keywords, because it can have multiple keywords divided by |.
	* Changed loading of the script to asynchronous.
	* Removed document.writes

* 2012-11-11
	* Fixed a CSS properity so ads work in Firefox and Opera again
	* Removed 1px images for counting
	* Added ajax views counting
	