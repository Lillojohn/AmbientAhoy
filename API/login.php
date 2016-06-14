<?php
include "XMLMaker.php";
include "database.php";
include "getType.php";
include_once "errorManager.php";

if($method == "POST")
{
	$type = GetReturnType();
	$data = file_get_contents("php://input");
	$data = json_decode($data);
		
	if(!isset($data->email))
		DisplayError("400", "Invalid Request.");
	
	if(!isset($data->password))
		DisplayError("400", "Invalid Request.");
		
	try
	{
		$user = $users->Where("`email`='$data->email'")[0];
		
		if($user->password == $data->password)
		{
			if($type == "json")
			{
				header("Content-Type:application/json");
				echo json_encode($user);
			}
			
			if($type == "xml")
			{
				header("Content-Type:application/xml");
				echo '<?xml version="1.0" encoding="utf-8"?>';
				
				echo ToXMLObject("user", $user);
			}
		}
		else
		{
			DisplayError("400", "Invalid Request.");
		}
	}
	catch()
	{
		DisplayError("400", "Invalid Request.");
	}
}