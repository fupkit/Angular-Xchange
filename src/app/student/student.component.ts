import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataShareService } from '../data-share.service';
import { Service } from '../services';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { StudentRegDialogComponent } from '../student-reg-dialog/student-reg-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  tutors: [];

  constructor(
    public dialog: MatDialog,
    private share: DataShareService,
    private service: Service,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    let token = this.share.getToken();
    this.validateStudent(token);
    this.service.getAllTutor(token).subscribe(res => {
      // console.log(res);
      let a = JSON.stringify(res);
      let r = JSON.parse(a);
      if (r.result) {
        this.tutors = r.tutors;
        // console.log(this.tutors);
      } else {
        this.snackBar.open(r.message, null, {
          duration: 2000
        });
      }
    });
  }

  appoint(tutor) {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '600px',
      data: {
        tutor: tutor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  validateStudent(token) {
    this.service.validateStudent(token).subscribe(res=>{
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if(!r.result) {
        const dialogRef = this.dialog.open(StudentRegDialogComponent, {
          width: '600px',
          data: {}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }
    })
  }

  like(tutor_id) {
    let token = this.share.getToken();
    this.service.likeTutor(token, tutor_id).subscribe(res=> {
      console.log(res);
      this.ngOnInit();
    })
  }



}
