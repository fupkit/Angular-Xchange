<?php
require_once('sql_connect.php');

class UserDao extends Connection
{
    const TABLE_NAME = 'user';
    public $mysqli;
    
    public function __construct()
    {
        $this->mysqli = $this->connect();
    }

    public function getByToken($token)
    {
        $res = array();
        $sql = "SELECT * FROM ".self::TABLE_NAME." WHERE user_id = (SELECT user_id FROM login_token WHERE token = '$token')";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getById($id)
    {
        $res = array();
        $sql = "SELECT * FROM ".self::TABLE_NAME." WHERE user_id = $id";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getByParam($param, $value)
    {
        $res = array();
        $sql = "SELECT * FROM ".self::TABLE_NAME." WHERE $param = '$value'";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getAll()
    {
        $rows = array();
        $sql = 'SELECT * FROM '.self::TABLE_NAME;
        $result = $this->mysqli->query($sql);
        while ($row = mysqli_fetch_object($result)) {
            array_push($rows, $row);
        }
        return $rows;
    }

    public function createUser($user)
    {
        $name = $user['name'];
        $phone = $user['phone'];
        $email = $user['email'];
        $gender = $user['gender'];
        $username = $user['username'];
        $password=  $user['password'];
        $picture = $user['picture'] ;

        $sql = "INSERT INTO ".self::TABLE_NAME." (`user_id`, `name`, `username`, `password`, `phone`, `email`, `gender`, `picture`) VALUES (NULL, '$name','$username', '$password', '$phone', '$email', '$gender', '$picture')";
        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
    }

    public function editUser($user)
    {
        $id = $user['user_id'];
        $name = $user['name'];
        $phone = $user['phone'];
        $email = $user['email'];
        $gender = $user['gender'];

        $password=  $user['password'];
        $picture = $user['picture'] ;

        $sql = "UPDATE ".self::TABLE_NAME." SET 
        `password` = '$password', `name` = '$name' ,`email` = '$email',`phone` = '$phone' ,`gender` = '$gender',`picture` = '$picture' 
        WHERE user_id = $id";

        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
    }

    public function checkLogin($username, $password)
    {
        $res = new stdClass();
        $sql = "SELECT * FROM ".self::TABLE_NAME." WHERE username = '$username' AND password = '$password'";
        $result = $this->mysqli->query($sql);
        if ($result->num_rows > 0) {
            $res->result = true;
            $res->message = 'success';
            $res->user = mysqli_fetch_object($result);
        } else {
            $res->result = false;
            $res->message = 'Invalid user / password';
        }
        return $res;
    }
}
?>