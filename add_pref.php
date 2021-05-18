<?php
session_start(); 
if(!isset($_SESSION['Sicily_Express_username'])){ 
    header('Location: accedi.php');
    exit;
}

    //verifica dati POST
if(isset($_POST["Box_ID"]) && isset($_POST["img"]) && isset($_POST["title"])){
    //connessione al db
    $conn = mysqli_connect("localhost","root","","SicilyExpress");
    //Aggiungi evento al DB
    $id_box = mysqli_real_escape_string($conn,$_POST["Box_ID"]);
    $user = $_SESSION['Sicily_Express_user_ID'];
    $img = mysqli_real_escape_string($conn,$_POST["img"]);
    $title = mysqli_real_escape_string($conn,$_POST["title"]);
    mysqli_query($conn,"INSERT INTO preferiti VALUES('$user','$id_box','$img', '$title')");
    mysqli_close($conn);
    exit;
    }
    mysqli_close($conn);
?>