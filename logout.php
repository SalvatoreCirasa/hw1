<?php
    session_start();
    session_destroy();

    header('Location: accedi.php');
    exit;
?>