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
var serverUrl = "http://mclion.tuinzdaj.net/2linesads/";

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
    http.open('GET', serverUrl + '2linesads_loader.php', false);
    http.send();
    if(http.readyState == 4 && http.status == 200) {
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
function arrayIndexOf(arrVar, strVar) {
	if(arrVar.indexOf) {
		if(arrVar.indexOf(strVar) != -1) {
			return true;
		} else {
			return false;
		}
	}

	for(i = 0; i < arrVar.length; i++) {
		if(arrVar[i] == strVar) {
			return true;
		}
	}
	return false;
}


function resetTimeout() {
	try {
		if(mID) {
			window.clearTimeout(mID);
			delete mID; // Works because it was not declared with a value
		}
	} catch(ex) {}
}

function startTimeout(timeOut) {
	if(mID <= 0) {
		//debugger;
	} else {
		window.clearTimeout(mID);
		mID = window.setTimeout("document.getElementById(\"adBox\").style.visibility=\"hidden\";", 2000);
	}
}

// Adds functions
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag, userID) {
	var newText = "";
	var i = -1;
	var loop = 0;
	var counter = 0;

	if(arrayIndexOf(basket, userID) === true) {
		return bodyText;
	}

	var searchString = new RegExp("([\\s])(" + searchTerm.toLowerCase() + "[a-z0-9]*)([\\s\\S])", "i");

	newText = bodyText.replace(searchString, "$1" + highlightStartTag + "$2" + highlightEndTag + "$3");
	if(newText.length > bodyText.length) {
		basket = basket.concat(userID);
		counter++;

		tmpCount += counter;
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
		if(searchText.indexOf("|") > 0) {
			var searchLoop = searchText.split("|");
			for(var xx = 0; xx < searchLoop.length; xx++) {
				adBoxID = "adBoxT_" + encodeURI(searchLoop[xx].toLowerCase());
				highlightStartTag = '<img src="' + serverUrl + 'cs.php?id=' + userID + '&adWord=' + encodeURI(searchLoop[xx]) + '" width="1" height="1" border="0" /><span id="' + adBoxID + '" onmouseover="dotxtad(\'' + adBoxID + '\',\'' + bannerPicture + '\',\'' + bannerTitle + '\',\'' + bannerDesc + '\',\'' + bannerURL + '\',\'' + searchLoop[xx] + '\',\'' + userID + '\');" onclick="window.open(\'' + bannerURL + '\');" oncontextmenu="return false;" onmouseout="startTimeout(1000);"  style="border-bottom-color : #008000; border-bottom-style : double; border-bottom-width : 3px; cursor : pointer;" href="' + bannerURL + '" target="_blank">';
				bodyText = doHighlight(bodyText, searchLoop[xx], highlightStartTag, highlightEndTag, userID);
			}
		} else {
			adBoxID = "adBoxT_" + encodeURI(searchText.toLowerCase());
			highlightStartTag = '<span id="' + adBoxID + '" onmouseover="dotxtad(\'' + adBoxID + '\',\'' + bannerPicture + '\',\'' + bannerTitle + '\',\'' + bannerDesc + '\',\'' + bannerURL + '\',\'' + searchText + '\',\'' + userID + '\');" onclick="window.open(\'' + bannerURL + '\');" oncontextmenu="return false;" onmouseout="startTimeout(1000);"  style="border-bottom-color : #008000; border-bottom-style : double; border-bottom-width : 3px; cursor : pointer;" href="' + bannerURL + '" target="_blank">';
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
	var boxID = document.getElementById("adBox");
	var humanURL, tmpHtml;

	boxID.style.left = 10 + "px";
	boxID.style.top = 10 + "px";
	boxID.style.width = 250 + "px";
	boxID.style.visibility = ""; // I think it's an IE hack, with hidden it does not always work.

	adTitle = unescape(adTitle);
	adText = unescape(adText);

	boxID.style.left = getRealLeft(linkID) + 5 + "px";
	// put it on the bottom
	boxID.style.top = getRealTop(linkID) + 20 + "px";

	humanURL = unescape(adURL.replace(/.*url=(.*)/, "$1"));
	humanURL = humanURL.replace(/http:\/\/([a-z0-9\.\-]*).*/i, "$1");

	tmpHtml = '<table style="color:#0;cursor:pointer;font-family:verdana;font-size:8pt;width:100%;" onmousemove="resetTimeout();" onmouseover="resetTimeout();" onmouseout="startTimeout(1000);" cellpadding="0" cellspacing="0" border="0" width="100%">';
	tmpHtml += '<tr onclick="window.open(\'' + adURL + '\');"><td colspan="2"><strong style="color : #0000ff; text-decoration : underline;">' + adTitle + '</strong></td></tr>';
	tmpHtml += '<tr onclick="window.open(\'' + adURL + '\');"><td colspan="2">' ;
	if(adPicture !== null) {
		tmpHtml += '<img src="' + adPicture + '" width="80" height="80" style="float:right; padding:2px;" />';
	}
	tmpHtml += adText + "</td></tr>";
	tmpHtml += '<tr><td style="color:#008000;font-size : 7pt;"><br /><strong>' + humanURL + '</strong></td><td style="color:blue;cursor:pointer;font-size:7pt;text-align:right;" onclick="window.open(\'https://github.com/mclion/2linesads\')"><br />What is this?<img src="' + serverUrl + '/cv.php?id=' + userID + '&adword=' + encodeURI(adWord) + '" width="1" height="1" border="0" />';
	tmpHtml += "</td></tr>";
	tmpHtml += "</table>";

	boxID.innerHTML = tmpHtml;
}

function addTheBox(divId) {
  // create a new div element
  // and give it some content
  var newDiv = document.createElement("div");
  newDiv.id = "adBox";
  newDiv.onmouseout = startTimeout(1000);
  newDiv.oncontextmenu = false;
  newDiv.onmouseover = resetTimeout();
  newDiv.style["-moz-opacity"] = 0.95;
  newDiv.style["background-color"] = "#ebf1f4";
  newDiv.style["border-color"] = "#dddddd";
  newDiv.style["border-style"] = "solid";
  newDiv.style["border-width"] = "2px";
  newDiv.style["filter"] = "alpha(opacity=95)";
  newDiv.style["opacity"] = 0.95;
  newDiv.style["position"] = "absolute";
  newDiv.style["visibility"] = "hidden";


  //var newContent = document.createTextNode('');
  //newDiv.appendChild(newContent); //add the text node to the newly created div.
 
  // add the newly created element and it's content into the DOM
  myDiv = document.getElementById(divId);
  document.body.insertBefore(newDiv, myDiv);
}


function init() {
	addTheBox("2linesads"); // initialize box
	
	var data = getPhrases();
	if (window.JSON && window.JSON.parse) {
        data = window.JSON.parse(data);
        searchPhrases(data);
	} else {
		return false; // We have no JSON, so we won't display any ads
	}
}

/* Here it starts ... */


var http = createRequestObject(); // Create AJAX object


var mID; // timeout id
var tmpCount = 0; // temp counter
var basket = []; // better than new Array();




//document.write('<span id="adBox" onmouseout="startTimeout(1000);"  oncontextmenu="return false;" onmouseover="resetTimeout();" style="-moz-opacity : 0.95; background-color : #ebf1f4; border-color : #dddddd; border-style : solid; border-width : 2px; filter : alpha(opacity=95); opacity : 0.95; position : absolute;visibility : hidden;"></span>');

init();
