2linesAds
===============
### Simple (non)intrusive text adds system written in PHP and JavaScript


This is a simple ads system, that searches articles for keywords and puts interactive ads in them. Ads are a combination of Google Adsense and graphical ads that is not intrusive for the user but generates many views and clicks on related content.

You can see how it looks here in the image below:

![How it looks](http://i438.photobucket.com/albums/qq103/mmclion/2linesads.jpg)


I wrote this in 2006, used it on a production site for about two years then forgot about it. I've found the code in an old backup of a backup and decided to open-source it under the MIT license. The code is mostly the same as I wrote in 2006, with some comments added and some debug code deleted. I did only one upgrade. The old code had an ugly hack to pass data from the database via PHP to the javascript. I've replaced it with JSON, even if it's not supported until IE8, but nowadays it should not be a problem, as it was in 2006.

Requirements
------------
* PHP 4+
* MySQL 4+ with Innodb support enabled

Installation
------------
1. Create a mysql database and import the file 2linesads.sql into it. 
2. Put your ads in the table 2linesads. There is no admin for editing data, just a very crude one for viewing stats.
3. In the part of the page you want to insert the ads, put a div with the id "body_content", so the javascript will know where to look.
4. At the end of your HTML, before the body, put this code:

```html
<script type="text/javascript" id="2linesads">
(function() {
function async_load(){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "2linesads.js";
    var x = document.getElementById("2linesads");
    x.parentNode.insertBefore(s, x);
}
if (window.attachEvent)
    window.attachEvent('onload', async_load);
else
    window.addEventListener('load', async_load, false);
})(); 
</script> 
```

Look at the demo.html file for an example. Also there is a **[live demo](http://mclion.tuinzdaj.net/2linesads/demo.html "live demo")** available.

Usage
-----
Put your ads in the table 2linesads in your mysql database.

**Columns:**
* **userid** At the moment has to be 1, it is planned to have different users (=sites) in the future...
* **title** The title that will be shown in the ad.
* **description** Long text under the title.
* **url** URL to link to.
* **picture** URL of picture to display. Has to be resized and uploaded manually at the moment.
* **keyword** Keywords, divided by |, like word1|word2|word3
* **campaignstart** Start date of campaign.
* **campaignend** End date of campaign.
* **adclicks** The humber of clicks to serve.
* **views** and **clicks** are updated as the visitor views or clicks the ad.

You can view the stats in SITE_URL/admin/ or in your database. An example of the crude admin **[can be seen here](http://mclion.tuinzdaj.net/2linesads/admin/)**.

 
Considerations
--------------

This was written in 2006, in another time, as to speak. It's not good code, especially the javascript bit, because at at least one point is not asynchronous, so it could stop the rendering of the page or any other javascript action.

Oh, another thing. The Admin is not secured in any way. At the moment is only a view stats thing anyway. If you don't want others to see the view and click stats you'll have to secure it with .htaccess or in some other way.


I will rewrite it if there will be enough interest or you can do it yourself. The fork button is up there. :)


## Contacts

If you have any questions, you can contact me here:

* http://twitter.com/mclion
* http://google.com/profiles/mclion
* http://www.linkedin.com/in/mclion