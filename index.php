<?php
   require_once 'database.php';
   if (!isset($_COOKIE['cookie_token'])) {
        header("Location: http://95.217.210.154/login.php");
        die();
   }
?>
<!doctype html>
<html>
<head>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Электронная очередь</title>
    <meta name="viewport" charset="utf-8" content="width=device-width, initial-scale=1">
    <style type="text/css">
        body{background:url(https://picjumbo.com/wp-content/uploads/macbook-on-wooden-desk-with-room-for-text-2210x1473.jpg)}
    </style>
    <link rel="stylesheet" href="https://bootstraptema.ru/plugins/2015/bootstrap3/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .table-fixed thead {
            width: 97%;
        }
        .table-fixed tbody {
            height: 230px;
            overflow-y: auto;
            width: 100%;
        }
        .table-fixed thead, .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th {
            display: block;
        }
        .table-fixed tbody td, .table-fixed thead > tr> th {
            float: left;
            border-bottom-width: 0;
        }
        .href {
            color: white;
            text-shadow: black 1px 1px 0, black -1px -1px 0,
                         black -1px 1px 0, black 1px -1px 0;
        }
        .remove_all {
                 position: absolute;
                 width: 6vw;
                 font-size: 1vw;
                 margin-top: 1vh;
                 margin-left: 65vw;
         }
	 .amount {
                position: absolute;
                width: 7vw;
                font-size: 1vw;
                margin-top: 1vh;
                margin-left: 70vw;
         }
     </style>
     <div class="container">
         <div class="row">
           <a href="http://95.217.210.154/auth.php" class="href"> Log out... </a>
             <div class="panel panel-default">
                 <div class="panel-heading">
                 <button class = "remove_all" onclick="removeAll()">Сбросить очередь</button>
	         <button class = "amount" onclick = "amount(this)">Количество людей</button>
                     <h3 align="center">
                         КЛИЕНТЫ
                     </h3>
                 </div>
                 <table class="table table-fixed" id = "table">
                     <tbody align="center">
			 <script src = "script.js"></script>
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
   </html>
