<?php
/**
 * 2LinesAds - simple text ads system (without banners)
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

$cookie_show = COOKIE_NAME . 's';
if (!isset($_COOKIE[$cookie_show])) {
    setcookie($cookie_show, uniqid('', 1), $_SERVER["REQUEST_TIME"] + 86400);
}
if (!check_ip($_SERVER['REMOTE_ADDR'], $_COOKIE[$cookie_show], $_GET['id'], $_SERVER["REQUEST_TIME"], 1800, 'show', $_GET['adword'])) {
    $db->query(
		"UPDATE 2linesads
		SET `shows`=`shows` + 1
		WHERE `id` = $_GET[id]") or die('err:' . $db->error);
}

