<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * Opens an URL and logs stats
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

require_once 'libs/init.php';
require_once BASEDIR.'/libs/functions.php';

$tmptime = $_SERVER["REQUEST_TIME"];

if(!isset($_COOKIE[COOKIE_NAME])) {
    setcookie(COOKIE_NAME,uniqid('',1),$_SERVER["REQUEST_TIME"]+86400);
}

if (!check_ip($_SERVER['REMOTE_ADDR'], $_COOKIE[COOKIE_NAME], $_GET['id'], $_SERVER["REQUEST_TIME"], 300, 'click','')) {
    $db -> query("UPDATE 2linesads
	   			     SET `clicks`=`clicks` + 1
					 WHERE `id` = $_GET[id]") or die('err:'.$db -> error);
} 
			
header('Location: ' . urldecode($_GET['url']));
?>