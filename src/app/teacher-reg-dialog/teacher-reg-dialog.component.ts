import { Component, OnInit } from '@angular/core';
import { Service } from '../services';
import { DataShareService } from '../data-share.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-reg-dialog',
  templateUrl: './teacher-reg-dialog.component.html',
  styleUrls: ['./teacher-reg-dialog.component.scss']
})
export class TeacherRegDialogComponent implements OnInit {
  regSuccess = false;
  constructor(
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TeacherRegDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(res => {
      if (!this.regSuccess) {
        this.router.navigate(['']);
      }else {
        this.router.navigate(['teacher']);
      }
    });
  }
  action() {
    let token = this.share.getToken();
    this.service.regTutor(token).subscribe(res => {
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      this.snackBar.open(r.message, null, {
        duration: 2000
      });
      if (!r.result) {
        this.router.navigate(['']);
      } else {
        this.regSuccess = true;
      }
      this.dialogRef.close();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
