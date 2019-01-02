<?php 

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
require_once('../db/userDao.php');
require_once('../db/authenDao.php');


$res = new stdClass();
$res->result = false;

if(isset($_GET["req"])) {
    $req = $_GET["req"];
    $userDao = new userDao();
    $authenDao = new authenDao();
    if($req == 'login') {
        if(isset($_GET["username"]) && isset($_GET["password"])) {
            
            $user = $_GET["username"];
            $password = $_GET["password"];
            $ures = $userDao->checkLogin($user, $password);
            if($ures->result) {
                $tres = $authenDao->createToken($ures->user);
                if($tres->result) {
                    $res->result = true;
                    $res->token = $tres->token;
                    $res->message = 'Login success';
                    $res->user = $ures->user;
                    unset($res->user->password);
                } else {
                    $res->message = $tres->message;
                }
            } else {
                $res->message = $ures->message;
            }
        }else {
            $res->message = "Invalid param(s)";
        }


    } else if ($req == 'token') {

        if(isset($_GET["token"])) {
            $token = $_GET["token"];
            $r = $authenDao->checkToken($token);
            if(count($r) > 0) {
                $res->result = true;
                $res->token = $token;
                $res->message = 'Login success';
                $res->user = $r[0];
                unset($res->user->password);
                unset($res->user->token);
            }
        }else {
            $res->message = "Invalid param(s)";
        }

    }
    
} else {
    $res->message = "Invalid param(s)";
}
echo json_encode($res);

?>