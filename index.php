<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Task Management System</title>
  <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link rel="stylesheet" href="css/code_highlight.css">
  <link rel="stylesheet" href="css/index.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</head>

<body>
  <div class="container">
    <div class="sidebar">
      <h1>Task Management System</h1>
      <button id="new-task" class="new-task-button">New Task</button>
      <ul class="command-history"></ul>
    </div>
      <div id="task-content" class="content">
        <div class="task-inputs">
            <div id="task-fields"></div>
            <button id="add-task" class="add-task-button">Add Task</button>
        </div>

        <button id="generate-tasks" class="generate-task-button">Generate tasks.json</button>

        <div class="code-snippet"><pre id="output"><code id="output-code" class="language-json"></code></pre></div>
        <a href="logout.php" class="logout-button">Logout</a>
      </div>
      <div class="menu">
        <h1>Examples</h1>
        <ul class="menu-history">
          <li onclick="loadExample(0)">Docker Run</li>
          <li onclick="loadExample(1)">PHP Run Server</li>
          <li onclick="loadExample(2)">C++ Compile</li>
          <li onclick="loadExample(3)">Git push</li>
        </ul>
      </div>
  </div>
  <script type="text/javascript">
    var hostURL = <?php include 'internal/config.php'; echo "\"" . Config::$SITE_URL . "\""; ?>;
  </script>
  <script src="js/index.js"></script>

</body>
</html>