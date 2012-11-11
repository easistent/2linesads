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
 * @copyright (c) 2006-2012 by Marko Milost / McLion
 * @license   http://opensource.org/licenses/mit-license.php MIT
 */

require_once 'libs/init.php';
require_once BASEDIR . '/libs/functions.php';

header('Content-Type: image/gif');
header('Expires: Wed, 11 Nov 1998 11:11:11 GMT');
header('Cache-Control: no-cache');
header('Cache-Control: must-revalidate');

if (!isset($_COOKIE[COOKIE_NAME])) {
    setcookie(COOKIE_NAME, uniqid('', 1), $_SERVER["REQUEST_TIME"] + 86400);
}
if (!check_ip($_SERVER['REMOTE_ADDR'], $_COOKIE[COOKIE_NAME], $_GET['id'], $_SERVER["REQUEST_TIME"], 1800, 'view', $_GET['adword'])) {
    $db->query("UPDATE 2linesads
	   			     SET `views`=`views` + 1
					 WHERE `id` = $_GET[id]") or die('err:' . $db->error);
}
// empty image
echo base64_decode('R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');