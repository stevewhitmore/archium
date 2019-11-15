<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Origin: *");

require_once('../Database.php');
require_once('TagController.php');

$database = new Database();
$dbConnection = $database->getConnection();
$requestMethod = $_SERVER["REQUEST_METHOD"];

$controller = new TagController($dbConnection, $requestMethod);
$controller->processRequest();
