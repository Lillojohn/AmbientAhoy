<?php
header("Access-Control-Allow-Origin: *");

include "XMLMaker.php";
include "database.php";
include "getType.php";

$type = GetReturnType();

$baseUrl = "http://www.timfalken.com/hr/annualnotes/events";

if(isset($_GET["id"]))
{
	if($type == "json")
	{
		header("Content-Type:application/json");
		
		echo json_encode(FinalizeChar($events->GetRow($_GET["id"])));
	}
	
	if($type == "xml")
	{
		header("Content-Type:application/xml");
		echo '<?xml version="1.0" encoding="utf-8"?>';
		
		echo ToXMLObject("user", FinalizeChar($events->GetRow($_GET["id"])));
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

	$all = $events->BuildPage($baseUrl, $start, $limit);
	
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
	
	/*CREATE:
	$datetime1 = new DateTime(); //nu
	$event->date = $datetime1->format("d-m");
	*/
	
function FinalizeChar($raw)
{	
	if($raw == null)
		return null;
		
	include "database.php";
	$eventNotes = $notes->Where("`eventId`='$raw->id'");
	
	$raw->notes = [];
	
	for($i = 0; $i < count($eventNotes); $i++)
	{
		$note = new stdClass();
		$note->id = $eventNotes[$i]->id;
		$note->title = $eventNotes[$i]->title;
		$note->links = [];
		
		$self = new stdClass();
		$self->rel = "self";
		$self->href = "http://www.timfalken.com/hr/annualnotes/notes/" . $note->id;
		
		$collection = new stdClass();
		$collection->rel = "collection";
		$collection->href = "http://www.timfalken.com/hr/annualnotes/notes/";
		
		array_push($note->links, $self);
		array_push($note->links, $collection);
			
		array_push($raw->notes, $note);
	}

	return $raw;
}