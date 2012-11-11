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
 */
require '../libs/init.php';

header('Content-Type: text/html; charset=utf-8');
?>
<html lang="sl-SI">
<head>
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/css/bootstrap.min.css" rel="stylesheet">
<title>2linesads admin</title>
</head>
<body>
    <div class="container">     <h1>Admin</h1>
<?php
$app = $_GET['app'];

if (!empty($app)) {
    switch ($app) {
        case 'log':
            require_once 'log.php';
            break;
        default:
    }
    
} else {
    $result = $db->query("SELECT *
                            FROM 2linesads
                            WHERE user_id = 1
                            ORDER BY title ASC") or die('err:' . $db->error);
   

    echo '<table class="table table-bordered table-striped">';
    echo '<thead><tr>
    <td><strong>id</strong></td>
    <td><strong>start</strong></td>
    <td><strong>end</strong></td>
    <td><strong>picture</strong></td>
    <td><strong>title</strong></td>
    <td><strong>keywords</strong></td>
    <td><strong>key views</strong></td>
    <td><strong>ad views</strong></td>
    <td><strong>clicks</strong></td>
    <td><strong>options</strong></td>
    </tr></thead>
    ';
    
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        echo '<tr>';
        echo '<td>' . $row['id'] . '</td>';
        echo '<td>' . $row['campaign_start'] . '</td>';
        echo '<td>' . $row['campaign_end'] . '</td>';
        echo '<td>';
        echo '<img src="' . $row['picture'] . '" />';
        echo '</td>';
        echo '<td>' . $row['title'] . '</td>';
        echo '<td>';
        echo str_replace('|', ', ', $row['keyword']);
        echo '</td>';
        echo '<td>' . $row['shows'] . '</td>';
        echo '<td>' . $row['views'] . '</td>';
        echo '<td>' . $row['clicks'] . '</td>';
        
        echo '<td><a href="index.php?app=log&id=' . $row['id'] . '" class="btn">log</a></td>';
        echo '</tr>';
    }
    
    echo '</table>';
    
}

?></div>
</body></html>