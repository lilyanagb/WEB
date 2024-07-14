<?php

include 'db.php';
$db = new Db();
$connection = $db->getConnection();

if ($_POST) {
    $command_id = $_POST['id'];
    $new_value = $_POST['value'];
    $sql = "UPDATE commands SET value='$new_value' WHERE ID=:id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $command_id);
    $stmt->execute();

    $commands = $stmt->fetchAll(0);

    echo json_encode($commands);
}

?>