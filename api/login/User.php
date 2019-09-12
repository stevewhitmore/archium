<?php
class User {

    private $conn;
    private $table_name = "user";

    public $id;
    public $userId;
    public $username;
    public $password;
    public $apiKey;

    public function __construct($db) {
        $this->conn = $db;
    }

    function usernameExists() {
        $query = "SELECT id, user_id, username, password
                FROM " . $this->table_name . "
                WHERE username = ?
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare( $query );

        // sanitize
        $this->username = htmlspecialchars(strip_tags($this->username));

        // bind given username value
        $stmt->bindParam(1, $this->username);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if username exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->userId = $row['user_id'];
            $this->username = $row['username'];
            $this->password = $row['password'];

            return true;
        }

        return false;
    }

}
?>
