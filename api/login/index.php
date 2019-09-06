<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");

include_once('../Database.php');
include_once('User.php');

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->username = $data->username;
$username_exists = $user->usernameExists();

function generateAPIkey() {
    return implode('-', str_split(substr(strtolower(md5(microtime().rand(1000, 9999))), 0, 30), 6));
}

if ($username_exists && ($data->password === $user->password)) {

    http_response_code(200);

    $key = generateAPIkey();
    $user->apiKey = $key;

    echo json_encode(
        array(
            "message" => "Successful login.",
            "username" => $user->username,
            "apiKey" => $user->apiKey
        )
    );

} else {
    http_response_code(401);

    echo json_encode(array("message" => "Login failed."));
}

?>