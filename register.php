<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); 

    include 'internal/db.php';

    $db = new Db();
    $connection = $db->getConnection();


    $checkUsernameQuery = "SELECT COUNT(*) FROM users WHERE Username = :username";
    $checkUsernameStmt = $connection->prepare($checkUsernameQuery);
    $checkUsernameStmt->bindParam(':username', $username);
    $checkUsernameStmt->execute();
    $usernameCount = $checkUsernameStmt->fetchColumn();

    if ($usernameCount > 0) {
        $error = "Username is already taken. Please choose a different username.";
    } else {
        $sql = "INSERT INTO users (ID, Username, Password) VALUES (DEFAULT, :username, :pass)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':pass', $password);
        $stmt->execute();
        
        header('Location: login.php');
        exit();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Registration</title>
    <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
    <link rel="stylesheet" href="css/register.css">
</head>
<body>
    <div class="container">
        <h2>VS Code Task Manager</h2>
        <form method="POST" action="">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required>
            <?php if (isset($error)): ?>
                <span class="error-message"><?php echo $error; ?></span>
            <?php endif; ?>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>

            <input type="submit" value="Register">
            <div class="login-link">
                Already have an account? <a href="login.php">Login here</a>
            </div>
        </form>
    </div>
</body>
</html>