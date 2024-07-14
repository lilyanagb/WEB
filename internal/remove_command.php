<?php

include 'db.php';
$db = new Db();
$connection = $db->getConnection();

if ($_POST) {
    $command_id = $_POST['id'];
    $sql = "DELETE FROM commands WHERE ID=:id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $command_id);
    $stmt->execute();

    $commands = $stmt->fetchAll(0);

    echo json_encode($commands);
}

?>