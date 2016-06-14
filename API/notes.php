<?php
header("Access-Control-Allow-Origin: *");

include "XMLMaker.php";
include "database.php";
include "getType.php";

$type = GetReturnType();

$baseUrl = "http://www.timfalken.com/hr/annualnotes/notes";

if(isset($_GET["id"]))
{
	if($type == "json")
	{
		header("Content-Type:application/json");
		
		echo json_encode(FinalizeChar($notes->GetRow($_GET["id"])));
	}
	
	if($type == "xml")
	{
		header("Content-Type:application/xml");
		echo '<?xml version="1.0" encoding="utf-8"?>';
		
		echo ToXMLObject("user", FinalizeChar($notes->GetRow($_GET["id"])));
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

	$all = $notes->BuildPage($baseUrl, $start, $limit);
	
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
	if($raw == null)
		return null;
	
	include "database.php";
	
	$raw->imageUrls = json_decode($raw->imageUrls);
	
	$noteUsers = $users->GetRow($raw->userId);
	
	$user = new stdClass();
	$user->id = $noteUsers->id;
	$user->name = $noteUsers->name;
	$user->links = [];
	
	$self = new stdClass();
	$self->rel = "self";
	$self->href = "http://www.timfalken.com/hr/annualnotes/users/" . $user->id;
	
	$collection = new stdClass();
	$collection->rel = "collection";
	$collection->href = "http://www.timfalken.com/hr/annualnotes/users/";
	
	array_push($user->links, $self);
	array_push($user->links, $collection);
		
	$raw->user = $user;
	
	//
	
	$noteEvent = $events->GetRow($raw->eventId);
	
	$event = new stdClass();
	$event->id = $noteEvent->id;
	$event->name = $noteEvent->name;
	$event->links = [];
	
	$self = new stdClass();
	$self->rel = "self";
	$self->href = "http://www.timfalken.com/hr/annualnotes/events/" . $event->id;
	
	$collection = new stdClass();
	$collection->rel = "collection";
	$collection->href = "http://www.timfalken.com/hr/annualnotes/events/";
	
	array_push($event->links, $self);
	array_push($event->links, $collection);
		
	$raw->event = $event;
	
	unset($raw->userId);
	unset($raw->eventId);
	
	return $raw;
}