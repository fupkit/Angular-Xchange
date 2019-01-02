<?php 

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$requires = glob('../db/*.php');
foreach ($requires as $file) {
    require_once($file);   
}

$res = new stdClass();
$res->result = false;
if(isset($_GET['req'])&&isset($_GET['token'])) {
    $req=$_GET['req'];
    $token=$_GET['token'];
    $userDao = new UserDao();
    $tutorDao = new tutorDao();
    $authenDao = new authenDao();
    $studentDao = new studentDao();
    switch ($req) {

        case "likeTutor" : {
            $u = $userDao->getByToken($token);
            if(sizeof($u) >0) {
                if(isset($_GET['tutor_id'])) {
                    $tutor_id = $_GET['tutor_id'];
                    $result = $tutorDao->likeTutor($tutor_id);
                    if($result == true) {
                        $res->result = true;
                        $res->message = "Success";
                        $res->tutor_id = $tutor_id;
                        echo json_encode($res);
                        return;
                    }
                }
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
        }

        case "validate" : {
            $t = $studentDao->getByToken($token);
            if(sizeof($t) >0 ) {
                if(isset($t[0]->student_id)) {
                    $res->result = true;
                    $res->message = 'Success';
                    $res->student = $t[0];
                    echo json_encode($res, JSON_NUMERIC_CHECK);
                    return;
                }
            }
            $res->message = "You Have not registered as Student";
            echo json_encode($res);
            return;
            break;
        }

        case "regStudent" : {
            $u = $userDao->getByToken($token);
            if(sizeof($u) >0) {
                $result = $studentDao->createStudent($u[0]);
                if($result == true) {
                    $res->message = 'Success';
                    $student = $studentDao->getByToken($token);
                    $res->student = $student[0];
                    echo json_encode($res);
                    return;
                } else {
                    $res->message = $result;
                    echo json_encode($res);
                    return;
                }
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
        }

        case "makeAppointment" : {
            if(isset($_POST['tutor_id']) && isset($_POST['date']) && isset($_POST['timeslots']) &&  isset($_POST['subject_id'])) {
                
                $student = $studentDao->getByToken($token);
                if(sizeof($student) > 0) {
                    $bookingDao = new bookingDao();
                    $student_id = $student[0]->student_id;
                    $tutor_id = $_POST['tutor_id'];
                    $date = $_POST['date'];
                    $subject_id = $_POST['subject_id'];
                    $timeslots = array_map('intval', explode(',', $_POST['timeslots']));
                    
                    $tIds = array_chunk($timeslots, 2);
                    foreach($tIds as $ids) {
                        $start = $ids[0];
                        $end = $ids[1];
                        $result = $bookingDao->createBooking($tutor_id, $student_id, $date, $start, $end, $subject_id);
                        if($result != true) {
                            $res->message = $result;
                            echo json_encode($res);
                            return;
                        }
                    }
                    $res->result = true;
                    $res->message = "Appointment Success";
                    echo json_encode($res);
                    return;
                }else {
                    $res->message = "Invalid Token";
                    echo json_encode($res);
                    return;
                }
            }
            break;
        }

        case "getSubjects" : {
            if(isset($_GET['tutor_id'])) {
            $id = $_GET['tutor_id'];
            $user = $authenDao->checkToken($token);
            if(sizeof($user) > 0) {
                $rSubjects = $tutorDao->getRegSubjectsByTutorId($id);
                $res->subjects = $rSubjects;
                $res->result = true;
                $res->message = "Success.";
                echo json_encode($res, JSON_NUMERIC_CHECK);
                return;
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            }
            break;
        }

        case "getAvailable" : {
            if(isset($_GET['tutor_id']) && isset($_GET['date'])) {
            $id = $_GET['tutor_id'];
            $date = $_GET['date'];
            $user = $authenDao->checkToken($token);
            if(sizeof($user) > 0) {
                $array = array();
                $timeslots;
                $bookings = $tutorDao->getTutorBooking($id, $date);
                $usedTimeslots = array();
                
                    foreach($bookings as $b) {
                        $ut = new stdClass();
                        $start = $b->start_timeslot_id;
                        $end = $b->end_timeslot_id;
                        $ut->start = $start;
                        $ut->end = $end;
                        array_push($usedTimeslots, $ut);
                    }
                
                    $timeslots = $tutorDao->getTutorAvailTime($id, $usedTimeslots);
                        foreach($timeslots as $t) {
                            array_push($array, $t);
                    }
                
                $times = my_array_unique($array);

                $res->timeslots = $times;
                $res->result = true;
                $res->message = "Success.";
                echo json_encode($res, JSON_NUMERIC_CHECK);
                return;
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            }
            break;
        }


        case "getAllTutor" : {
            if(sizeof($authenDao->checkToken($token)) >0) {
                $tutors = $tutorDao->getAll();
                for($i = 0; $i< sizeof($tutors); $i++) {
                    $rSubjects = $tutorDao->getRegSubjectsByTutorId($tutors[$i]->tutor_id);
                    $tutors[$i]->subjects = $rSubjects;
                    unset($tutors[$i]->password);
                }
                

                $res->result = true;
                $res->message = "Success";
                $res->tutors = $tutors;
                echo json_encode($res);
                return;
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            break;
        }

        case "getBookingsOfStudent" : {
            $studentDao = new studentDao();
            $subjectDao = new subjectDao();
            $bookingDao = new bookingDao();
            $timeslotDao = new timeslotDao();
            $students = $studentDao->getByToken($token);
            if(sizeof($students) > 0) {
                $student = $students[0];
                $res->bookings = array();
                $bookings = $bookingDao->getBookingsOfStudent($token);
                if(sizeof($bookings) < 1) {
                    $res->message = "No appointment.";
                    echo json_encode($res);
                    return;
                }
                foreach($bookings as $b) {
                    $booking = new stdClass();

                    $booking->subject_name =$subjectDao->getById($b->subject_id)[0]->subject_name ;

                    $tutor = $tutorDao->getById($b->tutor_id)[0];
                    $booking->tutor_name = $tutor->username;
                    $booking->tutor_phone = $tutor->phone;
                    $booking->tutor_email = $tutor->email;

                    
                    $booking->student_name = $student->username;
                    $booking->student_phone = $student->phone;
                    $booking->student_email = $student->email;

                    $booking->date = $b->booking_date;
                    $booking->start_time = $timeslotDao->getById($b->start_timeslot_id)[0]->slot;
                    $booking->end_time = $timeslotDao->getById($b->end_timeslot_id)[0]->slot;
                    array_push($res->bookings, $booking);
                }
                $res->result = true;
                $res->message = "Success";
                echo json_encode($res);
                return;
            }  else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            break;
        }
        
        default: {
            $res->message = "Invalid request";
            echo json_encode($res);
            break;
            return;
        }
    }
} else {
    $res->message = "Invalid request";
}
echo json_encode($res);

function my_array_unique($array, $keep_key_assoc = false){
    $duplicate_keys = array();
    $tmp = array();       

    foreach ($array as $key => $val){
        // convert objects to arrays, in_array() does not support objects
        if (is_object($val))
            $val = (array)$val;

        if (!in_array($val, $tmp))
            $tmp[] = $val;
        else
            $duplicate_keys[] = $key;
    }

    foreach ($duplicate_keys as $key)
        unset($array[$key]);

    return $keep_key_assoc ? $array : array_values($array);
}

?>