<?php
//CORS HEADERS to allows external frontend to cross communicated with PHP OOP backend

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

require 'request_handler.php';

$handler = new RequestHandler();
$handler->handle();