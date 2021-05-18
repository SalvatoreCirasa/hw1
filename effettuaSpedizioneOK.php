<?php
session_start(); 

if(!isset($_SESSION['Sicily_Express_username'])){ 
    header('Location: home.php');
    exit;
}
?>


<html>
    <head>
        <link rel='stylesheet' href='effettuaSpedizioneOK.css'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">  
        <title>Sicily Express Spedizioni OK</title>

    </head>

    <body>
          <header> 
          <div id="Overlay"></div>  
          <h1> Sicily Express</h1>
          
          </header>
          <div id='container'>
          <div id='link'>
            <h2>Spedizione effettuata con successo.</h2>
            <a href=Home.php>Torna alla Home </a>  
          </div>
          </div>

          <footer> 
                <address>Studente: Cirasa Salvatore  <br>   Matricola: O46001676</address>
        </footer>
    </body>

</html>