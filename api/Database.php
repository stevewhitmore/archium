<?php

class Database {
 
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;
 
    public function __construct(){
        $ini = parse_ini_file("config.ini");
        $env = $this->getEnvironment($ini);
        $this->host = $ini['db_local_host'];
        $this->db_name = $ini['db_local_name'];
        $this->username = $ini['db_local_user'];
        $this->password = $ini['db_local_password'];
    }

    public function getEnvironment($ini) {
        if ($_SERVER["REMOTE_ADDR"] === "::1") {
            return "localhost";
        } else {
            return "remote";
        }
    }

    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>
