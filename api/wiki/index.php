<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");

require_once('../Database.php');
require_once('WikiController.php');

$database = new Database();
$dbConnection = $database->getConnection();
$requestMethod = $_SERVER["REQUEST_METHOD"];

$controller = new WikiController($dbConnection, $requestMethod);
$controller->processRequest();