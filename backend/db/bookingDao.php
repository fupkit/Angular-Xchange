<?php
require_once('sql_connect.php');

class bookingDao extends Connection
{
    const TABLE_NAME = 'booking';
    public $mysqli;
    
    public function __construct()
    {
        $this->mysqli = $this->connect();
    }

    public function getBookingsOfTutor($token)
    {
        $res = array();
        $sql = "SELECT * FROM booking WHERE tutor_id = 
        (SELECT tutor_id FROM tutor WHERE user_id = 
        (SELECT user_id from login_token WHERE token = '$token'));";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getBookingsOfStudent($token)
    {
        $res = array();
        $sql = "SELECT * FROM booking WHERE student_id = 
        (SELECT student_id FROM student WHERE user_id = 
        (SELECT user_id from login_token WHERE token = '$token'));";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function createBooking($tutor_id, $student_id, $date, $start, $end, $subject_id)
    {

        $sql = "INSERT INTO ".self::TABLE_NAME." 
        (`tutor_id`,`student_id`,`booking_date`,`start_timeslot_id`,`end_timeslot_id`,`subject_id`) 
        VALUES 
        ( $tutor_id, $student_id, '$date', $start, $end, $subject_id)";

        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
        return true;
    }

    public function getAll($token)
    {
        $res = array();
        $sql = "SELECT * FROM booking;";
        
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

}
?>