<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * This is a simple ads system without banners that I've wrote long ago ...
 * It is in it's early stages of development. Feel free to fork and upgrade it.
 *
 *
 * @author    Marko Milost <mclion@gmail.com>
 * @copyright (c) 2006-2012 by Marko Milost / mclion
 * @license   http://opensource.org/licenses/mit-license.php MIT
 * @version 0.2
 */




require_once 'libs/init.php';
header("Content-type: image/gif");
//Header( "Expires: Wed, 11 Nov 1998 11:11:11 GMT");
//Header( "Cache-Control: no-cache");
//Header( "Cache-Control: must-revalidate");
require_once BASEDIR . '/libs/functions.php';

$cookie_show = COOKIE_NAME . 's';
if (!isset($_COOKIE[$cookie_show])) {
    setcookie($cookie_show, uniqid('', 1), $_SERVER["REQUEST_TIME"] + 86400);
}
if (!check_ip($_SERVER['REMOTE_ADDR'], $_COOKIE[$cookie_show], $_GET['id'], $_SERVER["REQUEST_TIME"], 1800, 'show', $_GET['addWord'])) {
    $db->query(
		"UPDATE 2linesads
	   			     SET `show`=`show` + 1
					 WHERE `id` = $_GET[id]"
        ) or die('err:' . $db->error);
}
// empty image
printf("%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%", 71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 255, 0, 192, 192, 192, 0, 0, 0, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68, 1, 0, 59);
