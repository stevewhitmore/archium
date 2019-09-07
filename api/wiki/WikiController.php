<?php

require_once('Wiki.php');

class WikiController {

    private $db;
    private $requestMethod;
    private $page;

    function __construct($db, $requestMethod) {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->page = new Wiki($db);
    }

    function processRequest() {
        switch($this->requestMethod) {
            case 'GET': 
                $this->handleGetRequest();
                break;
            case 'PUT':
                $this->authTokenCheck();
                $this->updatePage();
                break;
            case 'POST':
                $this->authTokenCheck();
                $this->createPage();
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
            return $this->getAllPagePaths();
        } else {
            $this->page->path = $_GET['path'];
            $result = $this->page->getPageByPath();
        
            if ($result) {
                echo $result;
            } else {
                echo json_encode(array("message" => "Page not found"));
                return header("HTTP/1.1 404 NOT FOUND");
            }
        }
    }
    
    function getAllPagePaths() {
        echo $this->page->getAllPagePaths();
    }
    
    function getPageByPath() {
        return $this->page->getPageByPath();
    }
    
    function updatePage() {
        $data = json_decode(file_get_contents("php://input"));
        if ($data->delete) {
            $this->page->markForDeletion($data);
        } else {
            $this->page->updatePage($data);
        }

        return header("HTTP/1.1 204 NO CONTENT");
    }

    function createPage() {
        $data = json_decode(file_get_contents("php://input"));
        $title = $data->title;

        $pageExists = $this->page->checkIfExists($title);

        if ($pageExists) {
            echo json_encode(array("message" => "Page already exists..."));
            return header("HTTP/1.1 409 CONFLICT");
        }

        $this->page->createPage($title);

        echo json_encode(array("message" => "New page created!"));
        return header("HTTP/1.1 201 CREATED");
    }

    private function authTokenCheck() {
        session_start();
        $headers = apache_request_headers();

        if (isset($headers['Authorization'])) {
            if ($headers['Authorization'] != $_SESSION["key"]) {
                return header("HTTP/1.1 403 FORBIDDEN");
            }
        }
    }

}
?>