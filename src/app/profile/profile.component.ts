import { Component, OnInit } from '@angular/core';
import { Service } from '../services';
import { DataShareService } from '../data-share.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  isDisabled = true;
  profileForm: FormGroup;
  constructor(
    private service: Service,
    private share: DataShareService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.share.getUser();
    console.log(this.user);
    this.profileForm = this.fb.group({
      email: [this.user.email, Validators.required],
      username: [this.user.username, Validators.required],
      password: ['', Validators.required],
      name: [this.user.name, Validators.required],
      phone: [this.user.phone, Validators.required],
      gender: [this.user.gender, Validators.required],
      picture: [this.user.picture]
    });
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['password'].disable();
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['phone'].disable();
    this.profileForm.controls['gender'].disable();
    this.profileForm.controls['picture'].disable();
  }
  editUser() {
    console.log(this.profileForm.value);
    let u = this.profileForm.value;
    u.user_id = this.user.user_id;
    console.log(u);
    let token = this.share.getToken();
    this.service.updateProfile(token, u).subscribe(res=>{
      let a = JSON.stringify(res);
      let r = JSON.parse(a);
      this.snackBar.open(r.message, null, {
        duration: 2000
      });
      if(r.result) {
        this.user = r.user;
        this.share.setUser(r.user);
        console.log(this.user);
      }
    })
  }
  toggleEdit(e) {
    if (e.checked) {
      this.profileForm.controls['email'].enable();
      this.profileForm.controls['password'].enable();
      this.profileForm.controls['name'].enable();
      this.profileForm.controls['phone'].enable();
      this.profileForm.controls['gender'].enable();
      this.profileForm.controls['picture'].enable();
      this.isDisabled = false;
    } else {
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['password'].disable();
      this.profileForm.controls['name'].disable();
      this.profileForm.controls['phone'].disable();
      this.profileForm.controls['gender'].disable();
      this.profileForm.controls['picture'].disable();
      this.isDisabled = true;
    }
  }

}
