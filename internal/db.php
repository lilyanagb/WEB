<?php
include 'config.php';

class Db
{
    private $connection;

    public function __construct()
    {
        $servername = Config::$DB_SERVER;
        $username = Config::$DB_USER;
        $password = Config::$DB_PASS;
        $dbname = Config::$DB_NAME;

        $this->connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}
?>