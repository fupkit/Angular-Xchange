import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataShareService } from '../data-share.service';
import { Service } from '../services';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { TeacherRegDialogComponent } from '../teacher-reg-dialog/teacher-reg-dialog.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  regSubjects = [];
  unRegSubjects = [];
  appointments = [];
  constructor(
    public dialog: MatDialog,
    private share: DataShareService,
    private service: Service
  ) { }

  ngOnInit() {
    let token = this.share.getToken();
    this.validateTeacher(token);
    this.service.getTutorSubjects(token).subscribe((res) => {
      // console.log(res);
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if (r.result) {
        this.share.setSubjects(r.subjects);
      } else {
        // alert(r.message);
      }
    });

    this.share.sharedSubjectList.subscribe(res => {
      if (res != null && res.length > 0) {
        let temp = JSON.stringify(res);
        let r = JSON.parse(temp);
        // console.log(r);
        this.regSubjects = r.filter(s => s.registered == true);
        this.unRegSubjects = r.filter(s => s.registered == false);
      }
    });

    this.share.sharedAppointmentList.subscribe(res => {
      if (res != null && res.length > 0) {
        let temp = JSON.stringify(res);
        let r = JSON.parse(temp);
        // console.log(r);
        this.appointments = r;
      }
    });

    this.service.getBookingsFromTutor(token).subscribe((res) => {
      // console.log(res);
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if (r.result) {
        this.appointments = r.bookings;
        this.share.setAppointments(r.bookings);
      } else {
        // alert(r.message);
      }
    });

  }
  popupSubjectForm(): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '600px',
      data: {
        regSubjects: this.regSubjects,
        unRegSubjects: this.unRegSubjects
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  validateTeacher(token) {
    this.service.validateTutor(token).subscribe(res=>{
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if(!r.result) {
        const dialogRef = this.dialog.open(TeacherRegDialogComponent, {
          width: '600px',
          data: {}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }
    })
  }

}
