<?php
$data = file_get_contents("php://input");
$data = json_decode($data);

echo "ISSET - " . (isset($data)? "TRUE":"FALSE");
echo "<br>";
var_dump($data);
echo "<br>";
$data = json_decode($data);


var_dump($data);
echo "<br>";

echo "ISSET - " . (isset($data)? "TRUE":"FALSE");

echo "<br>";
echo $_SERVER["REQUEST_METHOD"];