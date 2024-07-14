<?php
class Config {
  public static $SITE_FN = "62589, 62599, 62643"; //can be used bellow
  public static $SITE_CREATOR = "Nikolay Rangelov, Lilyana Belcheva, Ivona Dumanova";
  public static $SITE_ADMIN_EMAIL = "idumanova@uni-sofia.bg, nkrangelov@uni-sofia.bg, lgbelcheva@uni-sofia.bg";
  public static $SITE_URL="http:\/\/localhost:80/web_project/";
  public static $ROOT_FOLDER="c:\xampp\htdocs\web_project";
  public static $DB_USER="root";
  public static $DB_PASS="";
  public static $DB_SERVER="localhost:3306";
  public static $DB_NAME="tasks";
}

if ($_GET) {
  echo json_encode($config);
}

?>
