import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class User {
  user_id: string;
  username: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  picture: string;
}
export class DataShareService {
  private sharedUserSource: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  sharedUser = this.sharedUserSource.asObservable();

  private sharedTokenSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  sharedToken = this.sharedTokenSource.asObservable();

  private subjectListSource: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  sharedSubjectList = this.subjectListSource.asObservable();

  private appointmentListSource: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  sharedAppointmentList = this.appointmentListSource.asObservable();

  private stuAppointmentListSource: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  sharedStuAppointmentList = this.stuAppointmentListSource.asObservable();

  constructor() { }

  setUser(user: User) {
    this.sharedUserSource.next(user);
  }
  getUser() {
    return this.sharedUserSource.getValue();
  }
  setToken(token: string) {
    this.sharedTokenSource.next(token);
  }
  getToken() {
    return this.sharedTokenSource.getValue();
  }
  setSubjects(data: []) {
    this.subjectListSource.next(data);
  }
  getSubjects() {
    return this.subjectListSource.getValue();
  }
  setAppointments(data: []) {
    this.appointmentListSource.next(data);
  }
  getAppointments() {
    return this.appointmentListSource.getValue();
  }
  setStuAppointments(data: []) {
    this.stuAppointmentListSource.next(data);
  }
  getStuAppointments() {
    return this.stuAppointmentListSource.getValue();
  }

}
