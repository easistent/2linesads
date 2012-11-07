<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * Views counter
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
require_once BASEDIR . '/libs/functions.php';
header("Content-type: image/gif");
if (!isset($_COOKIE[COOKIE_NAME])) {
    setcookie(COOKIE_NAME, uniqid('', 1), $_SERVER["REQUEST_TIME"] + 86400);
}
if (!check_ip($_SERVER['REMOTE_ADDR'], $_COOKIE[COOKIE_NAME], $_GET['id'], $_SERVER["REQUEST_TIME"], 1800, 'view', $_GET['addWord'])) {
    $db->query("UPDATE 2linesads
	   			     SET `views`=`views` + 1
					 WHERE `id` = $_GET[id]") or die('err:' . $db->error);
}
// empty image
printf("%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%", 71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 255, 0, 192, 192, 192, 0, 0, 0, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68, 1, 0, 59);
?>