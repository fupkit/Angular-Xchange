import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/services';
import { User } from 'src/app/data-share.service';
export interface DialogData {

}
@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  @Output() cancel = new EventEmitter<string>();
  regForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private service: Service,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      picture: ['']
    });
    // this.regForm.valueChanges.subscribe(console.log);
  }

  register() {
    if (this.regForm.valid) {
      let user: User = new User();
      user.email = this.regForm.value.email;
      user.username = this.regForm.value.username;
      user.password = this.regForm.value.password;
      user.name = this.regForm.value.name;
      user.phone = this.regForm.value.phone;
      user.gender = this.regForm.value.gender;
      user.picture = this.regForm.value.picture;
      this.service.register(user).subscribe((r) => {
        let temp = JSON.stringify(r);
        let res = JSON.parse(temp);
        // console.log(temp);
        if (res.result) {
          this.closeDialog();
        }
        this.snackBar.open(res.message, null, {
          duration: 2000
        })
      });
    }
  }

  closeDialog() {
    this.cancel.emit();
  }

}
