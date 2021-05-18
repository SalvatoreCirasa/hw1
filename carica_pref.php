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
        $query = "SELECT * FROM preferiti WHERE id = '$user'";
        $res= mysqli_query($conn,$query);
         
        while($row = mysqli_fetch_assoc($res)){
            $response[$i]['id_box'] = $row['id_box'];
            $response[$i]['img'] = $row['img'];
            $response[$i]['title'] = $row['title'];

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