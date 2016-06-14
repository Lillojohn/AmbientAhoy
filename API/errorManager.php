<?php
function DisplayError($code, $message)
{
	header("HTTP/1.0 404 Not Found");
	echo "<h1>" . $code . "</h1>";
	echo $message;
	exit();
	die();
}