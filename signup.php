   <?php
  if (isset($_COOKIE['cookie_token'])) {
          header("Location: http://95.217.210.154/index.php");
          die();
      }
    ?>
   <!doctype html>
           <html lang="en">
             <head>
               <meta charset="utf-8">
               <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
               <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
               <title>Регистрация</title>
             </head>
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                 <style>
                 body{background:url(https://picjumbo.com/wp-content/uploads/macbook-on-wooden-desk-with-room-for-text-2210x1473.jpg)}
                 .form-horizontal{
                  background: #fff;
                  padding-bottom: 40px;
                  border-radius: 15px;
                  text-align: center;
                 }
                 .form-horizontal .heading{
                  display: block;
                  font-size: 35px;
                  font-weight: 700;
                  padding: 35px 0;
                  border-bottom: 1px solid #f0f0f0;
                  margin-bottom: 30px;
                 }
                 .form-horizontal .form-group{
                  padding: 0 40px;
                  margin: 0 0 25px 0;
                  position: relative;
                 }
                 .form-horizontal .form-control{
                  background: #f0f0f0;
                  border: none;
                  border-radius: 20px;
                  box-shadow: none;
                  padding: 0 20px 0 45px;
                  height: 40px;
                  transition: all 0.3s ease 0s;
                 }
                 .form-horizontal .form-control:focus{
                  background: #e0e0e0;
                  box-shadow: none;
                  outline: 0 none;
                 }
                 .form-horizontal .form-group i{
                  position: absolute;
                  top: 12px;
                  left: 60px;
                  font-size: 17px;
                  color: #c8c8c8;
                  transition : all 0.5s ease 0s;
                 }
                 .form-horizontal .form-control:focus + i{
                  color: #00b4ef;
                 }
                 .form-horizontal .fa-question-circle{
                  display: inline-block;
                  position: absolute;
                  top: 12px;
                  right: 60px;
                  font-size: 20px;
                  color: #808080;
                  transition: all 0.5s ease 0s;
                 }
                 .form-horizontal .fa-question-circle:hover{
                  color: #000;
                 }
                 .form-horizontal .main-checkbox{
                  float: left;
                  width: 20px;
                  height: 20px;
                  background: #11a3fc;
                  border-radius: 50%;
                  position: relative;
                  margin: 5px 0 0 5px;
                  border: 1px solid #11a3fc;
                 }
                 .form-horizontal .main-checkbox label{
                  width: 20px;
                  height: 20px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  cursor: pointer;
                 }
                 .form-horizontal .main-checkbox label:after{
                  content: "";
                  width: 10px;
                  height: 5px;
                  position: absolute;
                  top: 5px;
                  left: 4px;
                  border: 3px solid #fff;
                  border-top: none;
                  border-right: none;
                  background: transparent;
                  opacity: 0;
                  -webkit-transform: rotate(-45deg);
                  transform: rotate(-45deg);
                 }
                 .form-horizontal .main-checkbox input[type=checkbox]{
                  visibility: hidden;
                 }
                 .form-horizontal .main-checkbox input[type=checkbox]:checked + label:after{
                  opacity: 1;
                 }
                 .form-horizontal .text{
                  float: left;
                  margin-left: 7px;
                  line-height: 20px;
                  padding-top: 5px;
                  text-transform: capitalize;
                 }
                 .form-horizontal .btn{
                  float: right;
                  font-size: 14px;
                  color: #fff;
                  background: #00b4ef;
                  border-radius: 30px;
                  padding: 10px 25px;
                  border: none;
                  text-transform: capitalize;
                  transition: all 0.5s ease 0s;
                 }
                 @media only screen and (max-width: 479px){
                  .form-horizontal .form-group{
                  padding: 0 25px;
                  }
                  .form-horizontal .form-group i{
                  left: 45px;
                  }
                  .form-horizontal .btn{
                  padding: 10px 20px;
                  }
                 }
                 </style>

                 <div class="container">
                  <div class="row">
                  <div class="col-md-offset-3 col-md-6">
                  <form class="form-horizontal" method="post" action="register.php">
                  <span class="heading">РЕГИСТРАЦИЯ</span>
                  <?php
                      if ($_GET){
                          $error=$_GET['err'];
                          if ($error == "loginexists"){
                                echo '<h4 class = "alert alert-danger">Пользователь уже существует!</h4>'."\n";
                          }
                          if ($error == "difpass"){
                                echo '<h4 class = "alert alert-danger">Пароли не совпадают!</h4>'."\n";
                          }
                          if ($error == "unknowncode"){
                                echo '<h4 class = "alert alert-danger">Введенный код не найден!</h4>'."\n";
                          }
                      }
                  ?>
                  <div class="form-group">
                  <input type="text" class="form-control" name="login" autocomplete="off" placeholder="Login" required >
                  <i class="fa fa-user"></i>
                  </div>
                  <div class="form-group">
                  <input type="password" class="form-control" name="pswrd" placeholder="Password" required>
                  <i class="fa fa-lock"></i>
                  </div>
                  <div class="form-group">
                  <input type="password" class="form-control" name="confirm" placeholder="Confirm password" required>
                  <i class="fa fa-lock"></i>
                  </div>
                  <div class="form-group">
                  <input type="password" class="form-control" name="code" placeholder="Enter unique code" required>
                  <i class="fa fa-lock"></i>
                  </div>
                  <div class="form-group">
                  <button type="submit" class="btn btn-default">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                  </div>
                  </form>
                  </div>

                  </div><!-- /.row -->
                 </div><!-- /.container -->
</html>



