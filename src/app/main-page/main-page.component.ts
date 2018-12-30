import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { User, DataShareService } from '../data-share.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  user: User = null;
  constructor(private share: DataShareService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.share.sharedUser.subscribe(user => {
      this.user = user;
    });
  }
  checkLogin(way: string) {
    if (this.user != null) {
        this.router.navigate([way]);
    } else {
      this.popupLoginForm();
    }
  }

  popupLoginForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
