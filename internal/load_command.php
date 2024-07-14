<?php

session_start();

include 'db.php';
$db = new Db();
$connection = $db->getConnection();

if ($_POST) {
    $command_id = $_POST['id'];
    $sql = "SELECT * FROM commands WHERE ID=:id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $command_id);
    $stmt->execute();

    $commands = $stmt->fetchAll(0);

    echo json_encode($commands);
} else {
    $userId = 'Invalid';

    try {

        $stmt = $connection->prepare('SELECT ID FROM users WHERE Username = :username');

        $stmt->bindParam(':username', $_SESSION['username']);

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $userId = $result['ID'];
        } else {
            echo "User not found";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    $sql = "SELECT * FROM commands WHERE Owner=:owner";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':owner', $userId);
    $stmt->execute();

    $commands = $stmt->fetchAll(0);

    echo json_encode($commands);
}

?>