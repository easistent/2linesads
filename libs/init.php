<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * Initialization and config
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

header('P3P: CP="NOI NID PSD OUR IND UNI"');

define('BASEDIR', '/var/www/2linesads/'); // path for includes on the server
define('BASEURL', 'http://McLion.tuinzdaj.net/2linesads/');
define('DATABASE', '2linesads');
define('DBHOST', 'localhost');
define('DBUSER', 'twolines');
define('DBPWD', '1234');
define('COOKIE_NAME','2linesads');


// database connection
$db = new mysqli(DBHOST, DBUSER, DBPWD, DATABASE) or die(mysqli_connect_error());

// Set UTF8 for connection
$db->set_charset("utf8");
