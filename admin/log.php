<?php
require '../libs/functions.php';

$result = $db->query("SELECT *
                    FROM 2linesads_log
                    WHERE add_id = " . $_GET['id']
                    . " ORDER BY event_time DESC")  or die('err:'.$db -> error);
                    
echo '<table class="table table-bordered table-striped">';
    echo '<thead><tr>
            <td><strong>time</strong></td>
            <td><strong>word</strong></td>
            <td><strong>action</strong></td>
            <td><strong>user</strong></td>
    </tr></thead><tbody>';
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    echo '<tr><td>' . $row['event_time'] . '</td><td>' . $row['word'] . '&nbsp;</td><td>' . $row['event_type'] . '</td><td>' . obfuscate_ip($row['ip']) . '/' . $row['cookie'] . '</td></tr>';
}
echo '</tbody></table>';
