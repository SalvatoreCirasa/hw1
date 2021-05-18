<?php
        session_start(); 
        if(!isset($_SESSION['Sicily_Express_username'])){ 
            header('Location: accedi.php');
            exit;
        }

        $conn=mysqli_connect('localhost','root','','SicilyExpress');
        $response=array();
        $i=0;
        $error = false;
        $user = $_SESSION['Sicily_Express_user_ID'];
        $query = "SELECT * FROM spedizioni WHERE id_mittente = '$user' ";
        $res= mysqli_query($conn,$query);
         
        while($row = mysqli_fetch_assoc($res)){
            $response[$i]['codice_spedizione'] = $row['codice_spedizione'];
            $response[$i]['nome_dest'] = $row['nome_dest'];
            $response[$i]['cognome_dest'] = $row['cognome_dest'];
            $response[$i]['città_dest'] = $row['Città_dest'];
            $response[$i]['data_spedizione'] = $row['data_spedizione'];
            $i++;
        }

        if($i > 0){
        echo json_encode($response);
        mysqli_free_result($res);
        mysqli_close($conn);
        exit;
        }

        else{
        mysqli_close($conn);
        echo json_encode($error);
        }
?>