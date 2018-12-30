import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment"
import { Md5 } from 'ts-md5/dist/md5';
import { User } from './data-share.service';

@Injectable()
export class Service {
    basePath: string;
    constructor(private http: HttpClient) {
        this.basePath = environment.apiEndPoint;
    }
    register(user: User) {
        user.password = <string>Md5.hashStr(user.password);

        let params = new HttpParams()
            .set('req', 'register')
            .set('user', JSON.stringify(user));

        return this.http.post(this.basePath + 'register.php', params);
    }
    login(username: string, password: string) {
        const un = username;
        const pwd = <string>Md5.hashStr(password);

        let params = new HttpParams()
            .set('username', un)
            .set('password', pwd)
            .set('req', 'login');

        return this.http.get(this.basePath + 'login.php', {
            params: params
        });
    }
    getUserByToken(token: string) {

        let params = new HttpParams()
            .set('token', token)
            .set('req', 'token');

        return this.http.get(this.basePath + 'login.php', {
            params: params
        });
    }

    getTutorSubjects(token: string) {

        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getSubjects');

        return this.http.get(this.basePath + 'tutorService.php', {
            params: params
        });
    }
    getBookingsFromTutor(token: string) {

        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getBookingsOfTutor');

        return this.http.get(this.basePath + 'tutorService.php', {
            params: params
        });
    }
    getBookingsFromStudent(token: string) {

        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getBookingsOfStudent');

        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }
    regSubjects(token: string, subjects: []) {

        let params = new HttpParams()
            .set('subjects', JSON.stringify(subjects));

        // console.log(subjects);

        return this.http.post(this.basePath + 'tutorService.php?req=regSubjects&token=' + token, params);
    }

    getAllTutor(token: string) {
        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getAllTutor');

        return this.http.get(this.basePath + 'tutorService.php', {
            params: params
        });
    }

    getTutorSubjectsByStudent(token: string, id) {
        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getSubjects')
            .set('tutor_id', id);

        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }

    getTutorAvailable(token: string, id, date) {
        let params = new HttpParams()
            .set('token', token)
            .set('req', 'getAvailable')
            .set('tutor_id', id)
            .set('date', date);

        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }

    makeAppointment(token: string, tutor_id, date, subject_id, timeslots) {
        let params = new HttpParams()
            .set('tutor_id', tutor_id)
            .set('subject_id', subject_id)
            .set('date', date)
            .set('timeslots', timeslots);

        return this.http.post(this.basePath +
            'studentService.php?req=makeAppointment&token=' + token, params);
    }

    validateTutor(token: string) {
        let params = new HttpParams()
        .set('token', token)
        .set('req', 'validate');
        return this.http.get(this.basePath + 'tutorService.php', {
            params: params
        });
    }
    validateStudent(token: string) {
        let params = new HttpParams()
        .set('token', token)
        .set('req', 'validate');
        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }

    regTutor(token: string) {
        let params = new HttpParams()
        .set('token', token)
        .set('req', 'regTutor');
        return this.http.get(this.basePath + 'tutorService.php', {
            params: params
        });
    }

    regStudent(token: string) {
        let params = new HttpParams()
        .set('token', token)
        .set('req', 'regStudent');
        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }

    likeTutor(token, tutor_id) {
        let params = new HttpParams()
        .set('tutor_id', tutor_id)
        .set('req', 'likeTutor')
        .set('token', token);
        return this.http.get(this.basePath + 'studentService.php', {
            params: params
        });
    }

    updateProfile(token, user) {
        user.password = <string>Md5.hashStr(user.password);
        let params = new HttpParams()
            .set('user', JSON.stringify(user));

        return this.http.post(this.basePath + 'userService.php?req=updateUser&token='+token, params);
    }

}