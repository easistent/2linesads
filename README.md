2linesAds
===============
### Simple and crude text adds system written in PHP and JavaScript


This is a simple ads system, that searches articles for keywords and puts interactive ads in them. 

You can see how it looks here in the image below:

![How it looks](http://i438.photobucket.com/albums/qq103/mmclion/2linesads_demo.png)


I wrote this in 2006, used it on a production site for about two years then forgot about it. I've found the code in an old backup of a backup and decided to opensource it under the MIT license. The code is mostly the same as I wrote in 2006, with some comments added and some debug code deleted. I did only one upgrade. The old code had an ugly hack to pass data from the database via PHP to the javascript. I've replaced it with JSON, even if it's not supported until IE8, but nowadays it should not be a problem, as it was in 2006.


Installation
------------

1. Create a DB and import the file 2linesads.sql into it. 
2. Put your ads in the table 2linesads. There is no admin for editing data, just a very crude one for viewing stats.
3. In the part of the page you want to insert the ads, put a div with the id "body_content", so the javascript will know where to look.
4. At the end of your HTML, before the body, put this code:
```html
<script type="text/javascript" src="URL OF SERVER/2linesads.js" id="2linesads"></script>
```

Look at the demo.html file for an example. Also there is a **[live demo](http://mclion.tuinzdaj.net/2linesads/demo.html "live demo")** available.
 
Considerations
--------------

This was written in 2006, in another time, as to speak. It's not good code, especially the javascript bit, because at at least two points is not async, so it could stop the rendering of the page or any other javascript action.

Also the code is not enclosed and uses global variables, so be warned. 

I will rewrite it if there will be enought interest or you can do it yourself. The fork button is up there. :)


_McLion_