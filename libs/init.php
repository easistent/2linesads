<?php
/**
 * Initialization for 2linesads
 *
 * @author    Marko Milost <mclion@gmail.com>
 * @copyright (c) 2006-2012 by Marko Milost / mclion
 */

// Constants, globals, connections
header('P3P: CP="NOI NID PSD OUR IND UNI"');


//define('BASEDIR',str_replace('include','',dirname(__FILE__))); // path for includes on the server
define('BASEDIR', '/var/www/2linesads/'); // path for includes on the server
define('BASEURL', 'http://mclion.tuinzdaj.net/2linesads/');


define('DATABASE', '2linesads');
define('DBHOST', 'localhost');
define('DBUSER', 'twolines');
define('DBPWD', '1234');

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');

define('COOKIE_NAME','2linesads');

// database connection
$db = new mysqli(DBHOST, DBUSER, DBPWD, DATABASE) or die(mysqli_connect_error());

// Set UTF8 for connection
$db->set_charset("utf8");
