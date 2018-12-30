import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';

import { Service } from 'src/app/services';
import { DataShareService } from 'src/app/data-share.service';

export interface DialogData {
  regSubjects;
  unRegSubjects;
}

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  subjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SubjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.subjectForm = this.fb.group({
      regSubjects: this.fb.array(this.data.regSubjects),
      unRegSubjects: this.fb.array(this.data.unRegSubjects),
      newSubject: ['', Validators.required],
      level: ['', Validators.required],
      cph: ['', Validators.required]
    });
  }

  action() {
    let nsid = this.subjectForm.value.newSubject;
    let rs = this.subjectForm.value.regSubjects;
    let us = this.subjectForm.value.unRegSubjects;
    us.forEach(s => {
      if (s.subject_id == nsid) {
        s.registered = true;
        s.level = this.subjectForm.value.level;
        s.charge_per_hour = this.subjectForm.value.cph;
        // console.log(s)
      }
    });
    let subjects = rs.concat(us);
    let token = this.share.getToken();
    this.service.regSubjects(token, subjects).subscribe(res => {
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      // console.log(r);
      if(r.result) {
        this.share.setSubjects(r.subjects);
      }
      this.snackBar.open(r.message, null, {
        duration: 2000
      });
      this.dialogRef.close();
    });
  }

  getRegControls() {
    return (<FormArray>this.subjectForm.get('regSubjects')).controls;
  }

  getUnRegControls() {
    return (<FormArray>this.subjectForm.get('unRegSubjects')).controls;
  }
}
