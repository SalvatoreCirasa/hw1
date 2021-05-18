<?php
session_start(); 

if(!isset($_SESSION['Sicily_Express_username'])){ 
    header('Location: home.php');
    exit;
}
?>


<html>
    <head>
        <link rel='stylesheet' href='visualizzaSpedizioni.css'>
        <script src='visualizzaSpedizioni.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">  
        <title>Sicily Express visualizza Spedizioni</title>

    </head>

    <body>
        <nav> 
            <h2 id='utente'> Utente : <?php echo $_SESSION['Sicily_Express_username']; ?></h2>
            <a class='nav_a' href='home.php'>Home</a>
            <a class='nav_a' href='visualizzaSpedizioni.php'> Le mie spedizioni </a>
            <a class='nav_a' href='effettuaSpedizioni.php'> Effettua una spedizione </a>
            <a class='nav_a' href='logout.php'>esci </a>

            
                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>

       <header> 
          <div id="Overlay"></div>  
          <h1> Sicily Express</h1>
      </header>
      <h3 class='Titolo'>Le mie Spedizioni</h3>
       
         <main>
                <section id='Spedizioni_effettuate'>
                <!--caricamento dinamico da DB-->
                </section>
         </main>
       
        <footer> 
                <address>Studente: Cirasa Salvatore  <br>   Matricola: O46001676</address>
        </footer>
    </body>
</html>