<?php
require_once 'database.php';
if (isset($_COOKIE['cookie_token'])){
   $token=$_COOKIE['cookie_token'];
   $query="SELECT login FROM users WHERE token = '$token'";
   $result=mysqli_query($link, $query);
   $user=mysqli_fetch_row($result);
   $user=$user[0];
   $query="UPDATE users SET token = NULL WHERE login = '$user'";
   $result=mysqli_query($link, $query);
   mysqli_close($link);
   setcookie('cookie_token', '');
   header("Location: http://95.217.210.154/login.php");
   die();
}
$login=$_POST['login'];
$password=$_POST['pswrd'];
$query="SELECT login FROM users";
$result=mysqli_query($link, $query);
for ($i=0; $i<mysqli_num_rows($result); ++$i){
    $acc = mysqli_fetch_row($result);
    if($login==$acc[0]){
        goto exist;
    }
}
mysqli_close($link);
header("Location: http://95.217.210.154/login.php?err=logindoesntexist");
die();
exist:
$query="SELECT password FROM users WHERE login = '$login'";
$result=mysqli_query($link, $query);
$acc_pass = mysqli_fetch_row($result);
$hash_password=$acc_pass[0];
if (password_verify ($password,$hash_password)){
    $token=bin2hex(random_bytes(32));
    $query = "UPDATE users SET token = '$token' WHERE login = '$login'";
    $result = mysqli_query($link, $query);
    mysqli_close($link);
    setcookie('cookie_token', $token);
    header("Location: http://95.217.210.154/index.php");
}
else {
    mysqli_close($link);
    header("Location: http://95.217.210.154/login.php?err=wrongpass");
}
?>

