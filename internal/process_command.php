<?php

session_start();
include 'db.php';

$db = new Db();
$connection = $db->getConnection();

if ($_POST) {
    $command = $_POST['command'];
    $label = $_POST['label'];
} else {
    $command='error';
    $label = 'error';
}

$userId = 'Invalid';

try {

    $stmt = $connection->prepare('SELECT ID FROM users WHERE Username = :username');

    $stmt->bindParam(':username', $_SESSION['username']);

    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $userId = $result['ID'];
        echo "User ID: $userId";
    } else {
        echo "User not found";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$sql = "INSERT INTO commands(Owner, Title, Value, ID) VALUES (:userId,:label,:command,DEFAULT )";
$stmt = $connection->prepare($sql);
$stmt->bindParam(':command', $command);
$stmt->bindParam(':userId', $userId);
$stmt->bindParam(':label', $label);
$stmt->execute();

$output = shell_exec($command);

echo $output;
?>