<?php

require_once('Tag.php');

class TagController {

    private $db;
    private $requestMethod;
    private $tag;

    function __construct($db, $requestMethod) {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->tag = new Tag($db);
    }

    function processRequest() {
        switch($this->requestMethod) {
            case 'GET':
                $this->handleGetRequest();
                break;
            default:
                echo json_encode(array("message" => "Request not recognized"));
                return header("HTTP/1.1 400 BAD REQUEST");
        }
    }

    function handleGetRequest() {
        if (!isset($_GET['path'])) {
            echo json_encode(array("message" => "Bad request"));
            return header("HTTP/1.1 400 BAD REQUEST");
        }

        if ($_GET['path'] === 'all') {
            echo $this->tag->getAllTags();
        } else {
            $this->tag->path = $_GET['path'];
            $result = $this->tag->getTagsForPage();

            if ($result) {
                echo $result;
            } else {
                echo json_encode(array("message" => "Page not found"));
                return header("HTTP/1.1 404 NOT FOUND");
            }
        }
    }



}
?>