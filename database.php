<?php
$link = mysqli_connect('localhost', 'root', '', 'admins');
    if (!$link) {
          die("Connection failed: " . mysqli_connect_error());
    }
?>