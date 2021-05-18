<?php

session_start(); //avvia la sessione

//verifichiamo se abbiamo già effettuato l'accesso.
   if(isset($_SESSION['Sicily_Express_username'])){
      header('Location: home.php');
      exit;
   }

    //controllare la presenza di tutti i campi in maniera corretta ed inserisci i dati nel DB in caso affermativo
    if(!empty($_POST['nome_utente']) && !empty($_POST['cognome_utente']) && !empty($_POST['username']) &&
     !empty($_POST['password']) && !empty($_POST['e_mail']) && !empty($_POST['città']) && !empty($_POST['provincia']) &&
     !empty($_POST['recapito_telefonico']) && !empty($_POST['acconsento'])){

         $error=array();

         $conn = mysqli_connect('localhost','root','','SicilyExpress');

         #Controllo generale dei dati:
         $username = mysqli_real_escape_string($conn,$_POST['username']);
         $nome = mysqli_real_escape_string($conn,$_POST['nome_utente']);
         $cognome = mysqli_real_escape_string($conn,$_POST['cognome_utente']);
         $password = mysqli_real_escape_string($conn,$_POST['password']);
         $email = mysqli_real_escape_string($conn,$_POST['e_mail']);
         $città = mysqli_real_escape_string($conn,$_POST['città']);
         $provincia = mysqli_real_escape_string($conn,$_POST['provincia']);
         $recapito_telefonico = mysqli_real_escape_string($conn,$_POST['recapito_telefonico']);

         #controllo username
         $query="SELECT username FROM users WHERE username = '$username'";
         $res= mysqli_query($conn,$query);
         if(mysqli_num_rows($res)>0){
            $error[]="Username già utilizzato";
         }

         if(strlen($_POST['username'])>15){
            $error[]="Username troppo lungo";
         }

         if(strlen($_POST['username'])<5){
            $error[]="Username troppo corto o non presente";
         }

         #controllo lunghezza nome
         if(strlen($nome)>15){
            $error[]="Nome utente troppo lungo";
         }

         if(strlen($nome)<2){
            $error[]="Nome troppo corto o non presente";
         }

         #controllo lunghezza cognome
         if(strlen($cognome)>15){
            $error[]="Cognome troppo lungo";
         }

         if(strlen($cognome)<2){
            $error[]="Cognome troppo corto o non presente";
         }

         #controllo password
         if(strlen($password)>15){
            $error[]="Password troppo lungo";
         }

         if(strlen($password)<5){
            $error[]="Password troppo corta o non presente";
         }

          #controllo numero di telefono
          $query="SELECT recapito_telefonico FROM users WHERE recapito_telefonico = '$recapito_telefonico'";
          $res= mysqli_query($conn,$query);
          if(mysqli_num_rows($res)>0){
             $error[]="numero già in utilizzato";
          }

         #controllo lunghezza numero di telefono
         if(strlen($recapito_telefonico)>12){
            $error[]="Numero non valido";
         }

         if(strlen($recapito_telefonico)<7){
            $error[]="Numero troppo corto o non presente";
         }

         #controllo lunghezza città
         if(strlen($città)>12){
            $error[]="Città non valida";
         }

         if(strlen($città)<2){
            $error[]="Città errata o non presente";
         }

         #controllo E-mail
         $query="SELECT e_mail FROM users WHERE e_mail = '$email'";
         $res= mysqli_query($conn,$query);
         if(mysqli_num_rows($res)>0){
            $error[]="E-mail già utilizzata";
         }

         if(strlen($_POST['e_mail'])<7){
            $error[]="E-mail troppo corta o non presente";
         }

         if(strlen($_POST['e_mail'])>30){
            $error[]="E-mail troppo lunga";
         }

         #aggiunta dei dati al DB
         if(count($error)==0){
            $pass_hash = password_hash($password,PASSWORD_BCRYPT);
            $password = mysqli_real_escape_string($conn,$pass_hash);
            $query="INSERT INTO users(nome_utente,cognome_utente,username,password,e_mail,Residenza_Città,Residenza_Provincia,recapito_telefonico)VALUES('$nome','$cognome','$username','$password','$email','$città','$provincia','$recapito_telefonico')";
            $res=mysqli_query($conn,$query);
            $_SESSION['Sicily_Express_username'] = $_POST['username']; #salva l'username.
            $_SESSION['Sicily_Express_user_ID'] = mysqli_insert_id($conn); #salva l'ultimo ID inserito nel database.
            header("Location: home.php");
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
        <link rel='stylesheet' href='registrati.css'>
        <script src='registrati.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">  
        <title>Sicily Express Registrazione</title>

    </head>

    <body>
       <header> 
          <div id="Overlay"></div>  
          <h1> Sicily Express</h1>
      </header>
      <h3 class='Titolo'>Registrazione</h3>
        <main>
                <section class="subscribe">
                
                <form name='signup' method='post'>
                    <div class="names">

                    <div class="nome_utente">
                        
                        <div><label>Nome*<input type='text' name='nome_utente' <?php if(isset($_POST["nome_utente"])){echo "value = ".$_POST["nome_utente"];} ?> ></label> </div>
                        <span></span>
                    </div>

                <div class="cognome_utente">
                        
                        <div><label>Cognome*<input type='text' name='cognome_utente' <?php if(isset($_POST["cognome_utente"])){echo "value = ".$_POST["cognome_utente"];} ?> ></label> </div>
                        <span></span>
                </div>
                </div>
                <div class="username">
                        
                        <div><label>Username*<input type='text' name='username' <?php if(isset($_POST["username"])){echo "value = ".$_POST["username"];} ?> ></label> </div>
                        <span></span>
                </div>


                <div class="password">
                        
                        <div><label>Password*<input type='password' name='password' <?php if(isset($_POST["password"])){echo "value = ".$_POST["password"];} ?> ></label> </div>
                        <span></span>
                </div>

                <div class="e_mail">
                        
                        <div><label>E-mail*<input type='text' name='e_mail' <?php if(isset($_POST["e-mail"])){echo "value = ".$_POST["e-mail"];} ?> ></label> </div>
                        <span></span>
                </div>

                <div class="città">
                        
                        <div><label>Città*<input type='text' name='città' <?php if(isset($_POST["città"])){echo "value = ".$_POST["città"];} ?> ></label> </div>
                        <span></span>
                </div>

                <div class="provincia">
                        
                        <div><label>Provincia*<select name="provincia"> 
                        <option value="Siracusa"> Siracusa </option> 
                        <option value="Catania"> Catania </option>
                        <option value="Palermo"> Palermo </option> 
                        <option value="Messina"> Messina </option>
                        <option value="Ragusa"> Ragusa </option> 
                        <option value="Trapani"> Trapani </option>
                        <option value="Caltanissetta"> Caltanissetta </option> 
                        <option value="Agrigento"> Agrigento </option>
                        <option value="Enna"> Enna </option> 
                        <?php if (isset($_POST["provincia"])){echo "value = ".$_POST["provincia"];} ?> </select> </label> </div>
                </div>

                <div class="recapito_telefonico">
                        <!--Se il submit non va a buon fine, il server reinderizza su questa pagina lasciando i valori inseriti precedentemente-->
                        <div><label>Recapito Telefonico*<input type='text' name='recapito_telefonico' <?php if(isset($_POST["recapito_telefonico"])){echo "value = ".$_POST["recapito_telefonico"];} ?> > </label> </div>
                        <span></span>
                </div>

                <div class="acconsento">
                        <div><label>Acconsento al trattamento dei miei dati.<input type='checkbox' name='acconsento' value='1' <?php if (isset($_POST["acconsento"])){echo "value = ".$_POST["acconsento"];} ?> ></label> </div>      
                </div>

                <div class="submit">
                        <div><input type='submit' id='submit' value='Registrati'></div>
                </div>

                </form>
                
                <div class="errore hidden">Compilare tutti i campi correttamente.</div>

                <div class="login">Hai un account? <a href="accedi.php">Accedi</a> </div>

            </section>
        </main>
        <footer> 
                <address>Studente: Cirasa Salvatore  <br>   Matricola: O46001676</address>
        </footer>
    </body>
</html>