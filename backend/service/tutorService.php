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
    $tutorDao = new tutorDao();
    $authenDao = new authenDao();
    $userDao = new userDao();
    switch ($req) {

        case "searchTutorByName" : {
            if(sizeof($authenDao->checkToken($token)) >0) {
                if(isset($_GET['name'])) {
                    $name = $_GET['name'];
                    $tutors = $tutorDao->searchByName($name);
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
                    $res->message = "Invalid Param";
                    echo json_encode($res);
                    return;
                }
                
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            break;
        }

        case "validate" : {
            $t = $tutorDao->getByToken($token);
            if(sizeof($t) >0 ) {
                if(isset($t[0]->tutor_id)) {
                    $res->result = true;
                    $res->message = 'Success';
                    $res->tutor = $t[0];
                    echo json_encode($res, JSON_NUMERIC_CHECK);
                    return;
                }
            }
            $res->message = "You Have not registered as Teacher";
            echo json_encode($res);
            return;
            break;
        }

        case "regTutor" : {
            $u = $userDao->getByToken($token);
            if(sizeof($u) >0) {
                $result = $tutorDao->createTutor($u[0]);
                if($result == true) {
                    $res->message = 'Success';
                    $tutor = $tutorDao->getByToken($token);
                    $res->tutor = $tutor[0];
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

        case "getSubjects" : {
            $user = $authenDao->checkToken($token);
            if(sizeof($user) > 0) {
                $res->result = true;
                $res->subjects = array();
                $res->message = "Success.";
                $rSubjects = $tutorDao->getRegSubjects($token);
                foreach($rSubjects as $s) {
                    $s->registered = true;
                    array_push($res->subjects, $s);
                }
                $uSubjects = $tutorDao->getUnRegSubjects($token);
                foreach($uSubjects as $s) {
                    $s->registered = false;
                    array_push($res->subjects, $s);
                }
                echo json_encode($res, JSON_NUMERIC_CHECK);
                return;
            } else {
                $res->message = "Invalid Token";
                echo json_encode($res);
                return;
            }
            break;
        }

        case "regSubjects" : {
            $subjects = json_decode($_POST['subjects']);
            $regSubs = array_filter($subjects, "filterRegSubject");
            
            $tutors = $tutorDao->getByToken($token);
            if(sizeof($tutors) >0) {
                foreach($regSubs as $s) {
                    $r = $tutorDao->regSubject($tutors[0]->tutor_id, $s);
                    if($r != true) {
                        $res->message = $r;
                        echo json_encode($res);
                        return;
                    }
                }
                
                if($r == true) {
                    $url = "req=getSubjects&token=".$token;
                    header('Location:'.$_SERVER['PHP_SELF'].'?'.$url);
                }
                else {
                    $res->message = $r;
                    echo json_encode($res);
                    return;
                }
            } else {
                $res->message = 'Invalid user';
                echo json_encode($res);
                return;
            }
            break;
        }

        case "getBookingsOfTutor" : {
            $studentDao = new studentDao();
            $subjectDao = new subjectDao();
            $bookingDao = new bookingDao();
            $timeslotDao = new timeslotDao();
            $tutors = $tutorDao->getByToken($token);
            if(sizeof($tutors) > 0) {
                $tutor = $tutors[0];
                $res->bookings = array();
                $bookings = $bookingDao->getBookingsOfTutor($token);
                if(sizeof($bookings) < 1) {
                    $res->message = "No appointment.";
                    echo json_encode($res);
                    return;
                }
                foreach($bookings as $b) {
                    $booking = new stdClass();

                    $booking->subject_name =$subjectDao->getById($b->subject_id)[0]->subject_name ;

                    $booking->tutor_name = $tutor->username;
                    $booking->tutor_phone = $tutor->phone;
                    $booking->tutor_email = $tutor->email;

                    $student = $studentDao->getById($b->student_id)[0];
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

function filterRegSubject($subject) {
    return $subject->registered;
}

?>