import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';

import { Service } from 'src/app/services';
import { DataShareService } from 'src/app/data-share.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  tutor;
}
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  subjects;
  timeslots;
  minDate = new Date();
  maxDate = new Date(new Date().setDate(this.minDate.getDate()+60));
  date = new Date();
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    console.log('min' + this.minDate);
    console.log('max' + this.maxDate);
    
    this.appointmentForm = this.fb.group({
      subject: ['', Validators.required],
      timeslot: ['', Validators.required],
      date: [this.date, Validators.required]
    });
    let token = this.share.getToken();
    this.service.getTutorAvailable(token, this.data.tutor.tutor_id, this.formatDate(this.date)).subscribe(res => {
      console.log(res);
      let a = JSON.stringify(res);
      let r = JSON.parse(a);
      if (r.result) {
        this.timeslots = r.timeslots.sort((x, y) => {
          x.id - y.id;
        });
      } else {
        this.snackBar.open(r.message, null, { duration: 2000 });
      }
    });
    this.service.getTutorSubjectsByStudent(token, this.data.tutor.tutor_id).subscribe(res => {

      let a = JSON.stringify(res);
      let r = JSON.parse(a);
      if (r.result) {
        this.subjects = r.subjects;
        console.log(r.subjects);
        if (this.subjects.length < 1) {
          this.snackBar.open('This Teacher has not registered any subject.', null, { duration: 2000 });
          this.dialogRef.close();
        }
        // this.appointmentForm.get('subject').setValue(r.subjects);
      } else {
        this.snackBar.open(r.message, null, { duration: 2000 });
      }
    });

  }
  selectDate(e) {
    this.appointmentForm.controls['timeslot'].setValue([]);
    this.date = e.value;
    console.log(this.date);
    let token = this.share.getToken();
    this.service.getTutorAvailable(token, this.data.tutor.tutor_id, this.formatDate(this.date)).subscribe(res => {
      console.log(res);
      let a = JSON.stringify(res);
      let r = JSON.parse(a);
      if (r.result) {
        this.timeslots = r.timeslots.sort((x, y) => {
          x.id - y.id;
        });
      } else {
        this.snackBar.open(r.message, null, { duration: 2000 });
      }
    });
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  action() {
    console.log(this.appointmentForm.value);
    let date = this.formatDate(this.appointmentForm.value.date);
    let subjectId = this.appointmentForm.value.subject;
    let timeslots = this.breakSequence(this.appointmentForm.value.timeslot);
    console.log(date, subjectId, timeslots);
    let token = this.share.getToken();
    this.service.makeAppointment(token, this.data.tutor.tutor_id, date, subjectId, timeslots).subscribe(res => {
      console.log(res);
      let a = JSON.stringify(res);
      let r = JSON.parse(a);

      this.snackBar.open(r.message, null, { duration: 2000 });
      if (r.result) {
        this.dialogRef.close()
      }
    })
  }

  breakSequence(a) {
    var r = [];
    var t = [];
    let array = a.sort((x, y) => x - y);
    console.log(array);
    for (var i = 0; i < array.length; ++i) {
      if (i == 0) {
        t.push(array[i]);
        continue;
      }
      if (array[i - 1] != (array[i] - 1)) {
        r.push(t);
        t = [];
      }

      t.push(array[i]);
    }
    r.push(t);

    for (var j = 0; j < r.length; j++) {
      if (r[j].length === 1) {
        r[j].push(r[j][0]);
      } else if (r[j].length > 2) {
        let temp = [];
        temp.push(r[j][0]);
        temp.push(r[j][r[j].length - 1]);
        r[j] = temp;
      }
    }

    return r;
  }


}
