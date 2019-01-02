<?php
require_once('sql_connect.php');

class authenDao extends Connection
{
    const TABLE_NAME = 'login_token';
    public $mysqli;
    
    public function __construct()
    {
        $this->mysqli = $this->connect();
    }

    public function checkToken($token)
    {
        $res = array();
        $sql = "SELECT T.*, U.* FROM ".self::TABLE_NAME." T LEFT JOIN user U ON U.user_id = T.user_id WHERE token = '$token'";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function createToken($user)
    {
        $res = new stdClass();
        $uid = $user->user_id;
        $token = bin2hex(openssl_random_pseudo_bytes(64));
        $sql = "INSERT INTO ".self::TABLE_NAME." (`user_id`,`token`,`logtime`) VALUES ($uid, '$token', CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE `token` = '$token' , `logtime` = CURRENT_TIMESTAMP";
        if ($this->mysqli->query($sql) === true) {
            $res->result = true;
            $res->message = 'Success';
            $res->token = $token;
        } else {
            $res->result = false;
            $res->message = mysqli_error($this->mysqli);
        }
        return $res;
    }
}
?>