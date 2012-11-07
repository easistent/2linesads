<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * Loads the ads into JSON 
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

require_once('libs/init.php');

$todaydate = date('Y-m-d').' 00:00:00'; // for the mysql cache

$result = $db->query("SELECT `keyword`,`title`, `description`,`url`,`id`,`picture`
						FROM 2linesads
						WHERE user_id = 1
                        AND campaign_start <= NOW()
                        AND campaign_end >= NOW()
                        AND ad_clicks > 0
                        AND ad_clicks > clicks
						ORDER BY `views` ASC, `clicks` ASC
						LIMIT 0,80") or die('err:'.$db -> error);


$tmp_x = 0;


$outarray = array();

while ($row = $result -> fetch_array(MYSQLI_ASSOC)) { 
    $outarray[] = array(
	    'keywords' => $row['keyword'],
	    'title' => addslashes($row['title']),
	    'picture' => addslashes($row['picture']),
	    'description' => addslashes($row['description']),
	    'url' => BASEURL."go.php?id=".$row['id']."&url=".urlencode($row['url']),
	    'id' => $row['id']
	    );
}


echo json_encode($outarray); //no json in javascript basic

$result->close();
