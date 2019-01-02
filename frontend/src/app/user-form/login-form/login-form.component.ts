import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Output, EventEmitter } from '@angular/core';
import { Service } from '../../services';
import { DataShareService, User } from '../../data-share.service';

export interface DialogData {

}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() cancel = new EventEmitter<string>();
  loginForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.loginForm.valueChanges.subscribe(console.log);
  }

  login() {
    this.service.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((r) => {
        let temp = JSON.stringify(r);
        let res = JSON.parse(temp);
        // console.log(res);
        if(res.result) {
          let user:User = res.user;
          this.share.setUser(user);
          this.share.setToken(res.token);
          this.closeDialog();
        }
        this.snackBar.open(res.message, null, {
          duration: 2000
        })
      });
  }

  closeDialog(){
    this.cancel.emit();
  }



}
