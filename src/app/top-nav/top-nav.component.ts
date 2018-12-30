import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material';
import { DataShareService, User } from '../data-share.service';
import { AppComponent } from '../app.component';
import { Service } from '../services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  user: User = null;

  constructor(public dialog: MatDialog,
    private share: DataShareService,
    private service: Service,
    public cookie: CookieService) { }

  ngOnInit() {
    if (this.share.getToken() != null) {
      this.service.getUserByToken(this.share.getToken()).subscribe((r) => {
        let temp = JSON.stringify(r);
        let res = JSON.parse(temp);
        // console.log('res: ' + temp);
        if (res.result) {
          this.user = res.user;
          this.share.setUser(this.user);
        } else {
          this.share.setToken(null);
        }
      });
    }
    this.share.sharedUser.subscribe(user => {
      this.user = user;
    });
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

  logout() {
    this.user = null;
    this.share.setUser(null);
    this.share.setToken(null);
    this.cookie.delete('token');
  }

  loadDefaultImg() {
    this.user.picture = 'assets/images/abstract-user.png';
  }

}
