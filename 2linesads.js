/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * Main script include it in your pages
 *
 * This is a simple ads system without banners that I've wrote long ago ...
 * It is in it's early stages of development. Feel free to fork and upgrade it.
 *
 *
 * @author    Marko Milost <mclion@gmail.com>
 * @copyright (c) 2006-2012 by Marko Milost / McLion
 * @license   http://opensource.org/licenses/mit-license.php MIT
 * @version 0.3
 */

// URL of the installation
var server_url = 'http://McLion.tuinzdaj.net/2linesads/';

/**
 * Util functions
 */

// Init AJAX
function createRequestObject() {
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		return new XMLHttpRequest();
	} else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}


// Send request
function getPhrases() {
    http.open('GET', server_url + '2linesads_loader.php',false);
    http.send();
    if( http.readyState == 4 && http.status == 200 ) {
			return http.responseText;
	}
   
}

function getRealTop(oElement) {
	var iReturnValue = 0;
	while(oElement !== null) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getRealLeft(oElement) {
	var iReturnValue = 0;
	while(oElement !== null) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

// Just for IE
function array_indexof(arr_var, str_var) {
	if(arr_var.indexOf) {
		if(arr_var.indexOf(str_var) != -1) {
			return true;
		} else {
			return false;
		}
	}

	for(i = 0; i < arr_var.length; i++) {
		if(arr_var[i] == str_var) {
			return true;
		}
	}
	return false;
}


function resetTimeout() {
	try {
		if(m_ID) {
			window.clearTimeout(m_ID);
			delete m_ID; // Works because it was not declared with a value
		}
	} catch(ex) {}
}

function startTimeout(timeOut) {
	if(m_ID <= 0) {
		//debugger;
	} else {
		window.clearTimeout(m_ID);
		m_ID = window.setTimeout('document.getElementById(\'addbox\').style.visibility=\'hidden\';', 2000);
	}
}

// Adds functions
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag, userID) {
	var newText = "";
	var i = -1;
	var loop = 0;
	var counter = 0;

	if(array_indexof(basket, userID) === true) {
		return bodyText;
	}

	var searchString = new RegExp("([\\s])(" + searchTerm.toLowerCase() + "[a-z0-9]*)([\\s\\S])", "i");

	newText = bodyText.replace(searchString, "$1" + highlightStartTag + "$2" + highlightEndTag + "$3");
	if(newText.length > bodyText.length) {
		basket = basket.concat(userID);
		counter++;

		tmp_count += counter;
		return newText;
	} else {
		return bodyText;
	}

}

// Setup the elements
function highlightSearchTerms(searchText, bannerTitle, bannerDesc, bannerURL, bannerPicture, userID) {
	
	highlightEndTag = "</span>";

	// Change with the element id you wish to scan
	if(document.getElementById("body_content")) {
		var bodyText = document.getElementById("body_content").innerHTML + ' '; // the space is needed for searching for the last element
		if(searchText.indexOf('|') > 0) {
			var searchLoop = searchText.split('|');
			for(var xx = 0; xx < searchLoop.length; xx++) {
				addboxID = 'addboxT_' + encodeURI(searchLoop[xx].toLowerCase());
				highlightStartTag = '<img src="' + server_url + 'cs.php?id=' + userID + '&adWord=' + encodeURI(searchLoop[xx]) + '" width="1" height="1" border="0" /><span id="' + addboxID + '" onmouseover="dotxtad(\'' + addboxID + '\',\'' + bannerPicture + '\',\'' + bannerTitle + '\',\'' + bannerDesc + '\',\'' + bannerURL + '\',\'' + searchLoop[xx] + '\',\'' + userID + '\');" onclick="window.open(\'' + bannerURL + '\');" oncontextmenu="return false;" onmouseout="startTimeout(1000);"  style="border-bottom-color : #008000; border-bottom-style : double; border-bottom-width : 3px; cursor : pointer;" href="' + bannerURL + '" target="_blank">';
				bodyText = doHighlight(bodyText, searchLoop[xx], highlightStartTag, highlightEndTag, userID);
			}
		} else {
			addboxID = 'addboxT_' + encodeURI(searchText.toLowerCase());
			highlightStartTag = '<span id="' + addboxID + '" onmouseover="dotxtad(\'' + addboxID + '\',\'' + bannerPicture + '\',\'' + bannerTitle + '\',\'' + bannerDesc + '\',\'' + bannerURL + '\',\'' + searchText + '\',\'' + userID + '\');" onclick="window.open(\'' + bannerURL + '\');" oncontextmenu="return false;" onmouseout="startTimeout(1000);"  style="border-bottom-color : #008000; border-bottom-style : double; border-bottom-width : 3px; cursor : pointer;" href="' + bannerURL + '" target="_blank">';
			bodyText = doHighlight(bodyText, searchText, highlightStartTag, highlightEndTag, userID);
		}

		document.getElementById("body_content").innerHTML = bodyText;

		return true;
	} else {
		return false;
	}
}


// Run the highlightsearch for every ad
function searchPhrases(searchArray) {
	for (var key in searchArray) {
		var obj = searchArray[key];
		highlightSearchTerms(obj.keywords, obj.title, obj.description, obj.url, obj.picture, obj.id);
	}
}

// This "draws" the ad
function dotxtad(adID, adPicture, adTitle, adText, adURL, adWord, userID) {
	// create DIV
	var linkID = document.getElementById(adID);
	var boxID = document.getElementById('addbox');
	var humanURL, tmp_html;

	boxID.style.left = 10 + 'px';
	boxID.style.top = 10 + 'px';
	boxID.style.width = 250 + 'px';
	boxID.style.visibility = '';

	adTitle = unescape(adTitle);
	adText = unescape(adText);

	boxID.style.left = getRealLeft(linkID) + 5 + 'px';
	// put it on the bottom
	boxID.style.top = getRealTop(linkID) + 20 + 'px';

	humanURL = unescape(adURL.replace(/.*url=(.*)/, "$1"));
	humanURL = humanURL.replace(/http:\/\/([a-z0-9\.\-]*).*/i, "$1");

	tmp_html = '<table style="color:#0;cursor:pointer;font-family:verdana;font-size:8pt;width:100%;" onmousemove="resetTimeout();" onmouseover="resetTimeout();" cellpadding="0" cellspacing="0" border="0" width="100%">';
	tmp_html += '<tr onclick="window.open(\'' + adURL + '\');"><td colspan="2"><strong style="color : #0000ff; text-decoration : underline;">' + adTitle + '</strong></td></tr>';
	tmp_html += '<tr onclick="window.open(\'' + adURL + '\');"><td colspan="2">' ;
	if(adPicture !== null) {
		tmp_html += '<img src="' + adPicture + '" width="80" height="80" style="float:right; padding:2px;" />';
	}
	tmp_html += adText + '</td></tr>';
	tmp_html += '<tr><td style="color:#008000;font-size : 7pt;"><br /><strong>' + humanURL + '</strong></td><td style="color:blue;cursor:pointer;font-size:7pt;text-align:right;" onclick="window.open(\'https://github.com/McLion/2linesads\')"><br />What is this?<img src="' + server_url + '/cv.php?id=' + userID + '&adword=' + encodeURI(adWord) + '" width="1" height="1" border="0" />';
	tmp_html += '</td></tr>';
	tmp_html += '</table>';

	boxID.innerHTML = tmp_html;
}

function init() {
	var data = getPhrases();
	if (window.JSON && window.JSON.parse) {
        data = window.JSON.parse(data);
        searchPhrases(data);
	} else {
		// We have no JSON, so we won't display any ads
	}
}

/* Here it starts ... */

// Create AJAX object
var http = createRequestObject();


var m_ID; // timeout id
var tmp_count = 0; // temp counter
//var basket = new Array();
var basket = []; // better than new Array();

init();

document.write('<span id="addbox" onmouseout="startTimeout(1000);"  oncontextmenu="return false;" onmouseover="resetTimeout();" style="-moz-opacity : 0.95; background-color : #ebf1f4; border-color : #dddddd; border-style : solid; border-width : 2px; filter : alpha(opacity=95); opacity : 0.95; position : absolute;visibility : hidden;"></span>');
