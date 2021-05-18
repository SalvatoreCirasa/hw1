<?php
session_start(); 
if(!isset($_SESSION['Sicily_Express_username'])){ 
    header('Location: accedi.php');
    exit;
}

    //verifica dati POST
if(isset($_POST["Drone_ID"])){
    //connessione al db
    $conn = mysqli_connect("localhost","root","","SicilyExpress");
    //Aggiungi evento al DB
    $id = mysqli_real_escape_string($conn,$_POST["Drone_ID"]);
    $user = $_SESSION['Sicily_Express_user_ID'];
    mysqli_query($conn,"DELETE FROM dislikes WHERE ID_utente = '$user' AND ID_drone = '$id'");

    $query="SELECT dislikes FROM dislikes_totali WHERE ID_drone = '$id' ";
    $res=mysqli_query($conn,$query);
    if(mysqli_num_rows($res)>0){
     $entry = mysqli_fetch_assoc($res);
     $returndata = array('ok' => true, 'ndislikes' => $entry['dislikes']);
     echo json_encode($returndata);
     mysqli_close($conn);
     exit;
    }
    mysqli_close($conn);
    echo json_encode(array('ok' => false));
}

?>