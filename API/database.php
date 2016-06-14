<?php 

include_once "ApiCollection.php";

$dbUsers = new DatabaseInfo("db.timfalken.com", "md300889db321903", "users", "md300889db321903", "zqrDXNJe");
$dbNotes = new DatabaseInfo("db.timfalken.com", "md300889db321903", "notes", "md300889db321903", "zqrDXNJe");
$dbEvents = new DatabaseInfo("db.timfalken.com", "md300889db321903", "events", "md300889db321903", "zqrDXNJe");

$users = new ApiCollection($dbUsers, new ParamsLayout(["name", "email", "password", "role"]));
$events = new ApiCollection($dbEvents, new ParamsLayout(["name", "date"]));
$notes = new ApiCollection($dbNotes, new ParamsLayout(["title", "problem", "solution", "imageUrls", "eventId", "userId"]));