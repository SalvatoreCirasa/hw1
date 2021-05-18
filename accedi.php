<?php
//Controllo della presenza dell'utente nel database 

    session_start(); //avvia la sessione

    //verifichiamo se abbiamo già effettuato l'accesso.
    if(isset($_SESSION['Sicily_Express_username'])){
        header('Location: home.php');
        exit;
    }

    if(!empty($_POST["username"]) && !empty($_POST["password"])){  //se i campi username e password non sono vuoti
     $conn = mysqli_connect('localhost','root','','SicilyExpress');
     $username = mysqli_real_escape_string($conn,$_POST["username"]);
     $password = mysqli_real_escape_string($conn,$_POST["password"]);

     $query = "SELECT id,username,password FROM users WHERE username = '$username' ";
     $res= mysqli_query($conn,$query);
    if(mysqli_num_rows($res) > 0 ){ //se il nome utente è presente
       $entry = mysqli_fetch_assoc($res); //ritorna una sola riga

            if(password_verify($password , $entry['password'])){ 

                mysqli_free_result($res);
                mysqli_close($conn);
                $_SESSION['Sicily_Express_username'] = $entry['username']; #crea una sessione ricordando l'username.
                $_SESSION['Sicily_Express_user_ID'] = $entry['id']; #crea una sessione ricordando l'ID.

            //reindirizzamento utente
            header("Location: home.php");
            mysqli_close($conn);
            exit;
            
            }
        }
        $error = "Username o password errati";
    }
    
?>

<html>
    <head>
        <link rel='stylesheet' href='accedi.css'>
       <!-- <script src='accedi.js' defer></script> -->

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">  
        <title>Sicily Express Accedi</title>
    </head>

    <body>
       <header> 
          <div id="Overlay"></div>  
          <h1> Sicily Express</h1>
       </header>

       <h3 class='Titolo'>Accedi</h3>
        <main class ="login">
            <section>
                    <?php
                    if(isset($error)){
                        echo"<span class='error'> $error </span>";
                    }
                    ?>
                <form name='login' method='post'>
                <div class="username">
                        
                        <div><label>Username<input type='text' name='username'<?php if (isset($_POST["username"])){echo "value = ".$_POST["username"];} ?>></label> </div>
                        
                </div>

                <div class="password">
                        
                        <div><label>Password<input type='password' name='password' ></label> </div>
                        
                </div>

                <div class="submit">
                        <div><input type='submit' id='submit' value='Accedi'></div>
                </div>
                </form>

                <div class="registrati">Non hai ancora un account? <a href="registrati.php">Registrati</a> </div>
            </section>
        </main>

      <footer> 
                <address>Studente: Cirasa Salvatore  <br>   Matricola: O46001676</address>
      </footer>
    </body>
</html>