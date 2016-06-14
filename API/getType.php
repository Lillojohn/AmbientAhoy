<?php

function GetReturnType()
{
	$type = "json";

	if(isset($_SERVER['HTTP_ACCEPT']))
	{
		if($_SERVER['HTTP_ACCEPT'] == "application/xml")
			$type="xml";
		else if($_SERVER['HTTP_ACCEPT'] == "application/json")
			$type="json";
		else if($_SERVER['HTTP_ACCEPT'] == "xml")
			$type = "xml";
		else if($_SERVER['HTTP_ACCEPT'] == "json")
			$type = "json";
		else
		{	
			if(!isset($_GET["type"]))
			{
				$type = "json";
				/*header("http/1.1 406");
				die();*/
			}
			else
			{
				$type = $_GET["type"];
			}
		}
	}
	
	return $type;
}