<?php
class Tag {

    private $conn;
    private $table_name = "tag";

    public $id;
    public $path;

    function __construct($db) {
        $this->conn = $db;
    }

    function getTagsForPage() {
        $query = "SELECT t.tag_id, t.tag_desc
                  FROM tag t
                  JOIN wiki w ON w.id = t.page_id
                  WHERE w.path = :path";

        $prepareQuery = $this->conn->prepare($query);
        $path = htmlspecialchars(strip_tags($this->path));
        $prepareQuery->bindValue(":path", $path, PDO::PARAM_STR);
        $prepareQuery->execute();

        $result = $prepareQuery->fetchAll(PDO::FETCH_ASSOC);
        $this->conn = null;

        return json_encode($result);
    }
}
?>
