<?php
require_once('sql_connect.php');

class studentDao extends Connection
{
    const TABLE_NAME = 'student';
    public $mysqli;
    
    public function __construct()
    {
        $this->mysqli = $this->connect();
    }

    public function getById($id)
    {
        $res = array();
        $sql = "SELECT T.*, U.* FROM ".self::TABLE_NAME." T"
        ." LEFT JOIN user U ON T.user_id = U.user_id".
        " WHERE T.student_id = $id";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getByToken($token)
    {
        $res = array();
        $sql = "SELECT T.*, U.*, K.* FROM ".self::TABLE_NAME." T"
        ." LEFT JOIN user U ON T.user_id = U.user_id"
        ." LEFT JOIN login_token K ON T.user_id = K.user_id"
        ." WHERE K.token = '$token'";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getByName($name)
    {
        $res = array();
        $sql = "SELECT T.*, U.* FROM ".self::TABLE_NAME." T"
        ." LEFT JOIN user U ON T.user_id = U.user_id".
        " WHERE U.name = $name";
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
        $sql = "SELECT T.*, U.* FROM ".self::TABLE_NAME." T"
        ." LEFT JOIN user U ON T.user_id = U.user_id";
        $result = $this->mysqli->query($sql);
        while ($row = mysqli_fetch_object($result)) {
            array_push($rows, $row);
        }
        return $rows;
    }

    public function createStudent($user)
    {
        $uid = $user->user_id;

        $sql = "INSERT INTO ".self::TABLE_NAME." (`student_id`, `user_id`) VALUES (NULL, '$uid')";
        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
    }
}
