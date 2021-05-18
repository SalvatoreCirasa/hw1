<?php
session_start(); 

if(!isset($_SESSION['Sicily_Express_username'])){ 
    header('Location: home.php');
    exit;
}

    //controllare la presenza di tutti i campi in maniera corretta ed inserisci i dati nel DB in caso affermativo
    if(!empty($_POST['nome_dest']) && !empty($_POST['cognome_dest']) &&
     !empty($_POST['città_dest']) && !empty($_POST['drone_spedizione']) && !empty($_POST['acconsento'])){

         $error=array();

         $conn = mysqli_connect('localhost','root','','SicilyExpress');

         #Controllo generale dei dati:
         $nome_dest = mysqli_real_escape_string($conn,$_POST['nome_dest']);
         $cognome_dest = mysqli_real_escape_string($conn,$_POST['cognome_dest']);
         $città_dest = mysqli_real_escape_string($conn,$_POST['città_dest']);
         $drone_spedizione = mysqli_real_escape_string($conn,$_POST['drone_spedizione']);
         $data_spedizione=date("d-m-Y");
         $ID_mittente=$_SESSION['Sicily_Express_user_ID'];


         #controllo lunghezza nome
         if(strlen($nome_dest)>15){
            $error[]="Nome utente troppo lungo";
         }

         if(strlen($nome_dest)<2){
            $error[]="Nome troppo corto o non presente";
         }

         #controllo lunghezza cognome
         if(strlen($cognome_dest)>15){
            $error[]="Cognome troppo lungo";
         }

         if(strlen($cognome_dest)<2){
            $error[]="Cognome troppo corto o non presente";
         }

         #controllo lunghezza città
         if(strlen($città_dest)>18){
            $error[]="Città non valida";
         }

         if(strlen($città_dest)<2){
            $error[]="Città errata o non presente";
         }

     


         #aggiunta dei dati al DB
         if(count($error)==0){
            $query="INSERT INTO spedizioni (id_mittente,nome_dest,cognome_dest,Città_dest, Drone_Spedizione, data_spedizione)VALUES('$ID_mittente','$nome_dest','$cognome_dest','$città_dest','$drone_spedizione','$data_spedizione')";
            $res=mysqli_query($conn,$query);
            header("Location: effettuaSpedizioneOK.php");
            mysqli_close($conn);
            exit(); 
        }
        else{
            $error[] = "Errore di connessione al DB";
        }
     }
?>


<html>
    <head>
        <link rel='stylesheet' href='effettuaSpedizioni.css'>
        <script src='effettuaSpedizioni.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">  
        <title>Sicily Express Spedizioni</title>

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
      <h3 class='Titolo'>Spedizione</h3>
        <main>
                <section class="spedizione">
                
                <form name='spedizione' method='post'>

                <div class="nome_dest">
                        
                        <div><label>Nome Destinatario*<input type='text' name='nome_dest' <?php if(isset($_POST["nome_dest"])){echo "value = ".$_POST["nome_dest"];} ?> ></label> </div>
                        <span></span>
                </div>

                <div class="cognome_dest">
                        
                        <div><label>Cognome Destinatario*<input type='text' name='cognome_dest' <?php if(isset($_POST["cognome_dest"])){echo "value = ".$_POST["cognome_dest"];} ?> ></label> </div>
                        <span></span>
                </div>
                
                <div class="città_dest">
                        
                        <div><label>Città destinatario*<input type='text' name='città_dest' <?php if(isset($_POST["città_dest"])){echo "value = ".$_POST["città_dest"];} ?> ></label> </div>
                        <span></span>
                </div>

                <div class="drone_spedizione">
                        
                        <div><label>Drone*<select name="drone_spedizione"> 
                        <option value="DJI INSPIRE 2"> DJI INSPIRE 2 </option> 
                        <option value="DJI MAVIC PRO 2"> DJI MAVIC PRO 2 </option>
                        <option value="DJI PHANTOM 4"> DJI PHANTOM 4  </option> 
                        <option value="FreeX mcfx"> FreeX mcfx </option>
                        <option value="Parrot Anafi"> Parrot Anafi </option> 
                        <option value="U PAIR 2"> U PAIR 2 </option>
                        <?php if (isset($_POST["drone_spedizione"])){echo "value = ".$_POST["drone_spedizione"];} ?> </select> </label> </div>
                </div>


                <div class="acconsento">
                        <div><label>Confermo la correttezza dei dati inseriti.<input type='checkbox' name='acconsento' value='1' <?php if (isset($_POST["acconsento"])){echo "value = ".$_POST["acconsento"];} ?> ></label> </div>      
                </div>

                <div class="submit">
                        <div><input type='submit' id='submit' value='Conferma Ordine'></div>
                </div>

                </form>
                
                <div class="errore hidden">Compilare tutti i campi correttamente.</div>

            </section>
        </main>
        <footer> 
                <address>Studente: Cirasa Salvatore  <br>   Matricola: O46001676</address>
        </footer>
    </body>
</html>