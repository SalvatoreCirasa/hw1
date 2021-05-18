<?php

    header('Content-Type: application/json');

    $conn = mysqli_connect('localhost','root','','SicilyExpress');

    $e_mail = mysqli_real_escape_string($conn, $_GET['q']);

    $query="SELECT e_mail FROM users WHERE e_mail = '$e_mail'";
    $res=mysqli_query($conn,$query) or die(mysqli_error($conn));

    $json = json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));

    echo $json;

    mysqli_close($conn);
?>