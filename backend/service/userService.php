<?php 

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
$requires = glob('../db/*.php');
foreach ($requires as $file) {
    require_once($file);   
}

$res = new stdClass();
$res->result = false;

if(isset($_GET["req"]) && isset($_GET['token'])) {
    $req = $_GET["req"];
    $token = $_GET['token'];
    $userDao = new userDao();
    $authenDao = new authenDao();
    if($req == 'updateUser' && isset($_POST['user'])) {
        $u = json_decode($_POST['user']);
        $dbUsers = $authenDao->checkToken($token);
        if(sizeof($dbUsers) > 0) {
            $user_id = $u->user_id;
            if($dbUsers[0]->user_id == $user_id) {
            
                $email = $u->email;
                $name = $u->name;
                $gender = $u->gender;
                $phone = $u->phone;
                $picture = $u->picture;
                $password = $u->password;
        
                $user = array();
                $user['user_id'] = $user_id;
                $user['email'] = $email;
                $user['name'] = $name;
                $user['gender'] = $gender;
                $user['phone'] = $phone;
                $user['picture'] = $picture;
                $user['password'] = $password;
                $result = $userDao->editUser($user);
                if($result == true) {
                    $res->result = true;
                    $res->message = "Update Success.";
                    $us = $userDao->getById($user_id)[0];
                    $res->user = $us;
                    echo json_encode($res);
                    return;
                } else {
                    $res->message = $result;
                    echo json_encode($res);
                    return;
                }

            }else {
                $res->message = "Invalid User";
                echo json_encode($res);
                return;
            }
        } else {
            $res->message = "Invalid Token";
            echo json_encode($res);
            return;
        }


    }
    
}
    
$res->message = "Invalid param(s)";
echo json_encode($res);
return;

?>