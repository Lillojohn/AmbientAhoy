<?php
header("Access-Control-Allow-Origin: *");

include "XMLMaker.php";
include "database.php";
include "getType.php";

$type = GetReturnType();

$baseUrl = "http://www.timfalken.com/hr/annualnotes/users";

if(isset($_GET["id"]))
{
	if($type == "json")
	{
		header("Content-Type:application/json");
		
		echo json_encode(FinalizeChar($users->GetRow($_GET["id"])));
	}
	
	if($type == "xml")
	{
		header("Content-Type:application/xml");
		echo '<?xml version="1.0" encoding="utf-8"?>';
		
		echo ToXMLObject("user", FinalizeChar($users->GetRow($_GET["id"])));
	}
}
else
{
	$start = 0;
	$limit = 100;
	
	if(isset($_GET["start"]))
		$start = $_GET["start"];
		
	if(isset($_GET["limit"]))
		$limit = $_GET["limit"];

	$all = $users->BuildPage($baseUrl, $start, $limit);
	
	for($i = 0; $i < count($all->items); $i++)
	{
		$all->items[$i] = FinalizeChar($all->items[$i]);
	}
	
	if($type == "json")
	{
		header("Content-Type:application/json");
		echo $all->ConvertToJSON();
	}
	
	if($type == "xml")
	{
		header("Content-Type:application/xml");
		echo '<?xml version="1.0" encoding="utf-8"?>';
		echo $all->ConvertToXML();
	}	
}
	
	
function FinalizeChar($raw)
{
	include "roles.php";
	
	if($raw == null)
		return null;

	include "database.php";
	unset($raw->password);// = "****";
	
	$raw->role = $roles[$raw->role];
	
	return $raw;
}