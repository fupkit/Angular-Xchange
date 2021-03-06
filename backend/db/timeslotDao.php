<?php
require_once('sql_connect.php');

class timeslotDao extends Connection
{
    const TABLE_NAME = 'ref_timeslot';
    public $mysqli;
    
    public function __construct()
    {
        $this->mysqli = $this->connect();
    }

    public function getById($id) {
        $res = array();
        $sql = "SELECT * FROM ".self::TABLE_NAME." WHERE id = $id";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getAll() {
 
        $res = array();
        $sql = "SELECT * FROM ".self::TABLE_NAME;
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

}
?>