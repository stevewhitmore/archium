<?php
class Wiki {

    private $conn;
    private $table_name = "wiki";

    public $id;
    public $title;
    public $content;
    public $path;

    function __construct($db) {
        $this->conn = $db;
    }

    function getPageByPath() {
        $query = "SELECT *
                FROM wiki
                WHERE path = :path
                LIMIT 0,1";

        $prepareQuery = $this->conn->prepare($query);

        $path = htmlspecialchars(strip_tags($this->path));

        $prepareQuery->bindValue(":path", $path, PDO::PARAM_STR);

        $prepareQuery->execute();

        $num = $prepareQuery->rowCount();

        if ($num > 0) {
            $row = $prepareQuery->fetch(PDO::FETCH_ASSOC);
            $this->conn = null;        // Disconnect

            return json_encode(
                array(
                    "pageId" => $row['id'],
                    "title" => $row['title'],
                    "content" => $row['content'],
                    "path" => $row['path'],
                )
            );
        }

        $this->conn = null;
        return null;
    }

    function getAllPagePaths() {
        $query = "SELECT title, path, marked_for_deletion
                  FROM " . $this->table_name;

        $prepareQuery = $this->conn->prepare($query);
        $prepareQuery->execute();

        $result = $prepareQuery->fetchAll(PDO::FETCH_ASSOC);
        $this->conn = null;

        return json_encode($result);
    }

    function updatePage($data) {
        $query = "UPDATE wiki
                  SET title = :title,
                      content = :content,
                      path = :path
                  WHERE id = :id";

        $prepareQuery = $this->conn->prepare($query);

        $title = htmlspecialchars(strip_tags($data->title));
        $content = htmlspecialchars(strip_tags($data->content));
        $path = htmlspecialchars(strip_tags($data->path));
        $id = htmlspecialchars(strip_tags($data->pageId));

        $prepareQuery->bindValue(":title", $title, PDO::PARAM_STR);
        $prepareQuery->bindValue(":content", $content, PDO::PARAM_STR);
        $prepareQuery->bindValue(":path", $path, PDO::PARAM_STR);
        $prepareQuery->bindValue(":id", $id, PDO::PARAM_INT);

        $prepareQuery->execute();

        $this->conn = null;
    }

    function createPage($title) {
        $query = "INSERT INTO wiki(title, content, path)
                  VALUES(:title, :content, :path)";

        $prepareQuery = $this->conn->prepare($query);

        $title = htmlspecialchars(strip_tags($title));
        $content = 'Add content here';
        $path = str_replace(' ', '-', strtolower($title));

        $prepareQuery->bindValue(":title", $title, PDO::PARAM_STR);
        $prepareQuery->bindValue(":content", $content, PDO::PARAM_STR);
        $prepareQuery->bindValue(":path", $path, PDO::PARAM_STR);

        $prepareQuery->execute();

        $this->conn = null;
    }

    function checkIfExists($title) {
        $prepareQuery = $this->conn->prepare("SELECT COUNT(*) FROM `wiki` WHERE `title` = :title");
        $prepareQuery->execute(array(':title' => $title));
        $result = $prepareQuery->fetch(PDO::FETCH_NUM);
        return $result[0];
    }

    function markForDeletion($data) {
        $query = "UPDATE wiki
                  SET marked_for_deletion = '1',
                      deletion_req_date = current_timestamp
                  WHERE id = :id";

        $prepareQuery = $this->conn->prepare($query);
        $id = htmlspecialchars(strip_tags($data->pageId));
        $prepareQuery->bindValue(":id", $id, PDO::PARAM_INT);

        $prepareQuery->execute();

        $this->conn = null;
    }

}
?>
