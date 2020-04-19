<?php
    require_once 'database.php';
    $login=$_POST['login'];
    $password=$_POST['pswrd'];
    $confirm=$_POST['confirm'];
    $code=$_POST['code'];
    var_dump($code);
    $query="SELECT code FROM users";
    $result=mysqli_query($link, $query);
    for ($i=0; $i<mysqli_num_rows($result); ++$i){
        $acc = mysqli_fetch_row($result);
        if($code==$acc[0]){
            var_dump($acc[0]);
            goto exist;
        }
    }
    mysqli_close($link);
    header("Location: http://kursach1/signup.php?err=unknowncode");
    die();
    exist:
    if ($password!=$confirm) {
        header("Location: http://kursach1/signup.php?err=difpass");
        die();
    }
    $query="SELECT login FROM users";
    $result=mysqli_query($link, $query);
    for ($i=0; $i<mysqli_num_rows($result); ++$i){
        $acc = mysqli_fetch_row($result);
        if($login==$acc[0]){
            header("Location: http://kursach1/signup.php?err=loginexists");
            die();
        }
    }
    mysqli_free_result($result);
    $hash_password=password_hash($password,PASSWORD_BCRYPT);
    $password=$hash_password;
    $query = "UPDATE users SET login = '$login', password = '$password' WHERE code = '$code'";
    if (mysqli_query($link, $query)) {
        var_dump(mysqli_query($link, $query));
        $token=bin2hex(random_bytes(32));
        $query = "UPDATE users SET token = '$token' WHERE login = '$login'";
        $result = mysqli_query($link, $query);
        setcookie('cookie_token', $token);
        header("Location: http://kursach1/index.php");
        mysqli_close($link);
        die();
    }
    else {
        echo "Error: " . $query . "<br>" . mysqli_error($link);
        mysqli_close($link);
        die();
    }
?>
