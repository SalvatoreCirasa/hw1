<?php

$provincia = $_GET['pro'];
$end_point = 'http://api.weatherstack.com/current';
$client_secret ='13fba4989021ef024fc749944bb6c63b';
$curl = curl_init();
$meteo_request = $end_point.'?access_key='.$client_secret.'&query='.$provincia.'&region=Sicilia' ;
curl_setopt($curl,CURLOPT_URL, $meteo_request);
curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
$result = curl_exec($curl);
curl_close($curl);
echo $result;
?>