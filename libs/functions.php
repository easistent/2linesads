<?php
/**
 * 2LinesAds - simple text ads system (without banners)
 *
 * functions
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
	 

function check_ip($ip, $cookie, $add_id, $event_time, $event_timeout, $event_type, $word='')
{
	global $db;

	$result = $db->query("SELECT event_time
							FROM 2linesads_log
							WHERE add_id=$add_id
							AND cookie='$cookie'
							AND event_type = '$event_type'
							AND event_time < ($event_time - $event_timeout)
							") or die('err:'.$db -> error);
    if  ($result->num_rows > 0) {
        return true; 
    } else {
    
        $db->query("UPDATE LOW_PRIORITY 2linesads_log
					   SET event_time=NOW(),
					   ip = '$ip'
					   WHERE cookie='$cookie'
					   AND add_id='$add_id'
					   AND event_type='$event_type'
					   ") or die('err:'.$db -> error);
        if ($db->affected_rows <= 0) {
            $db->query("INSERT INTO 2linesads_log
					   SET event_time=NOW(),
					   ip = '$ip',
					   cookie='$cookie',
					   add_id='$add_id',
					   `word` = '$word',
					   event_type='$event_type'") or die('err:'.$db -> error);
        }
        return false; 
    
    }
}