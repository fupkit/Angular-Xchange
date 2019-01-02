import { Component, OnInit } from '@angular/core';
import { Service } from '../services';
import { DataShareService } from '../data-share.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-reg-dialog',
  templateUrl: './student-reg-dialog.component.html',
  styleUrls: ['./student-reg-dialog.component.scss']
})
export class StudentRegDialogComponent implements OnInit {

  regSuccess = false;
  constructor(
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentRegDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(res => {
      if (!this.regSuccess) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['student']);
      }
    });
  }
  action() {
    let token = this.share.getToken();
    this.service.regStudent(token).subscribe(res=>{
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      this.snackBar.open(r.message, null, {
        duration: 2000
      });
      if(!r.result) {
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
