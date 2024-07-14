<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    include 'internal/db.php';

    $db = new Db();
    $connection = $db->getConnection();

    $sql = "SELECT Password FROM users WHERE Username=:user";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':user', $username);
    $stmt->execute();
    
    $hashedPasswordFromDatabase = $stmt->fetchColumn();

    if ($hashedPasswordFromDatabase !== false) {
        if (password_verify($password, $hashedPasswordFromDatabase)) {
            $_SESSION['username'] = $username; 
            header('Location: index.php'); 
            exit();
        }
    }
    $error = 'Invalid username or password';
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Login</title>
    <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container">
        <h2>User Login</h2>
        <?php if (isset($error)): ?>
            <p class="error-message"><?php echo $error; ?></p>
        <?php endif; ?>
        <form method="POST" action="">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required>

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>

            <input type="submit" value="Login">
            <div class="register-link">
                Don't have an account? <a href="register.php">Register here</a>
            </div>
        </form>
    </div>
</body>
</html>