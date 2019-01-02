<?php
require_once('sql_connect.php');

class TutorDao extends Connection
{
    const TABLE_NAME = 'tutor';
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
        " WHERE T.tutor_id = $id";
        
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

    public function searchByName($name)
    {
        $res = array();
        $sql = "SELECT T.*, U.* FROM ".self::TABLE_NAME." T"
        ." LEFT JOIN user U ON T.user_id = U.user_id"
        ." WHERE U.name LIKE '%$name%'";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getRegSubjects($token) {
        $res = array();
        $sql = "SELECT RS.*, S.* FROM tutor_subjects S 
        LEFT JOIN ref_subject RS ON S.subject_id = RS.subject_id 
        LEFT JOIN tutor T ON S.tutor_id = T.tutor_id 
        LEFT JOIN login_token LT ON T.user_id = LT.user_id 
        WHERE LT.token = '$token'";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }


    public function getRegSubjectsByTutorId($id) {
        $res = array();
        $sql = "SELECT RS.*, S.* FROM tutor_subjects S 
        LEFT JOIN ref_subject RS ON S.subject_id = RS.subject_id 
        LEFT JOIN tutor T ON S.tutor_id = T.tutor_id 
        WHERE T.tutor_id = '$id'";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getTutorAvailTime($id, $usedTimeslots) {
        $res = array();
        $size = sizeof($usedTimeslots);
        if($size > 0) {
            $sql = "SELECT * FROM ref_timeslot WHERE ";
            for($i=0; $i<$size; $i++) {
                $start = $usedTimeslots[$i]->start;
                $end = $usedTimeslots[$i]->end;
                if($i == 0) {
                    $sql .= " (id NOT BETWEEN $start AND $end)";
                } else {
                    $sql .= " AND (id NOT BETWEEN $start AND $end)";
                }
            }
        } else {
            $sql = "SELECT * FROM ref_timeslot";
        }
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getTutorBooking($id, $date) {
        $date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));
        $res = array();
        $sql = "SELECT * FROM booking WHERE booking_date = '$date' AND tutor_id = $id";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function getUnRegSubjects($token) {
        $res = array();
        $sql = "SELECT * FROM ref_subject WHERE subject_id NOT IN (
            SELECT subject_id FROM tutor_subjects WHERE tutor_id = (
            SELECT tutor_id FROM tutor WHERE user_id = (
            SELECT user_id FROM login_token WHERE token = '$token'
            ) 
            )
        )";
        if ($result = $this->mysqli->query($sql)) {
            while ($row = mysqli_fetch_object($result)) {
                array_push($res, $row);
            }
        }
        return $res;
    }

    public function regSubject($tutorId, $subject) {
        $sql = "INSERT IGNORE INTO tutor_subjects (`tutor_id`, `subject_id`, `level`, `charge_per_hour`) VALUES 
        ($tutorId, $subject->subject_id, '$subject->level', $subject->charge_per_hour) ";
        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
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
        if($result == true) {
        while ($row = mysqli_fetch_object($result)) {
            array_push($rows, $row);
        }
        } else {
            return mysqli_error ($this->mysqli);
        }
        return $rows;
    }

    public function createTutor($user)
    {
        if (null === $this->mysqli) {
            $this->connect();
        }
        $uid = $user->user_id;

        $sql = "INSERT INTO ".self::TABLE_NAME." (`tutor_id`, `user_id`) VALUES (NULL, '$uid')";
        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
    }

    public function likeTutor($tutor_id) {
        $sql = "UPDATE ".self::TABLE_NAME." SET rating = rating + 1 WHERE tutor_id = $tutor_id";
        if ($this->mysqli->query($sql) === true) {
            return true;
        } else {
            return mysqli_error($this->mysqli);
        }
    }
    
}
?>