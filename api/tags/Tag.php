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
                  WHERE w.id = :pageId";

        $prepareQuery = $this->conn->prepare($query);
        $pageId = htmlspecialchars(strip_tags($this->pageId));
        $prepareQuery->bindValue(":pageId", $pageId, PDO::PARAM_STR);
        $prepareQuery->execute();

        $result = $prepareQuery->fetchAll(PDO::FETCH_ASSOC);
        $this->conn = null;

        return json_encode($result, JSON_NUMERIC_CHECK);
    }

    function getAllTags() {
        $query = "SELECT DISTINCT tag_id, tag_desc
                  FROM tag;";

        $prepareQuery = $this->conn->prepare($query);
        $prepareQuery->execute();

        $result = $prepareQuery->fetchAll(PDO::FETCH_ASSOC);
        $this->conn = null;

        return json_encode($result, JSON_NUMERIC_CHECK);
    }
}
?>
