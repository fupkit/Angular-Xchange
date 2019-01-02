<?php 

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
require_once('../db/userDao.php');


$res = new stdClass();
$res->result = false;
if(isset($_POST['user']) && isset($_POST['req'])) {
    $req = $_POST['req'];
    $u = json_decode($_POST['user']);
    
    $username = $u->username;
    $password = $u->password;
    $email = $u->email;
    $name = $u->name;
    $phone = $u->phone;
    $gender = $u->gender;
    $picture = $u->picture;

    $userDao = new userDao();
    if($userDao->getByParam('username', $username)) {
        $res->result = false;
        $res->message = 'user name already in use';
        echo json_encode($res);
        return;
    }
    else if($userDao->getByParam('email', $email)) {
        $res->result = false;
        $res->message = 'email already in use';
        echo json_encode($res);
        return;
    }
    else if($userDao->getByParam('phone', $phone)) {
        $res->result = false;
        $res->message = 'phone already in use';
        echo json_encode($res);
        return;
    } else {
        $user = array();
        $user['email'] = $email;
        $user['username'] = $username;
        $user['phone'] = $phone ;
        $user['gender'] = $gender;
        $user['name'] = $name;
        $user['password']=  $password;
        $user['picture'] = $picture;

        if($msg = $userDao->createUser($user)) {
            $res->result = true;
            $res->message = 'register success!';
            echo json_encode($res);
            return;
        } else {
            $res->result = false;
            $res->message = $msg;
            echo json_encode($res);
            return;
        }
    }

} else {
    $res->message = 'Invalid param(s)';
    echo json_encode($res);
}


?>