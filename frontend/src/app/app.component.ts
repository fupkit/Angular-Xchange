import { Component, OnInit } from '@angular/core';
import { DataShareService } from './data-share.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private share: DataShareService, public cookie: CookieService) { }
  title = 'Xchange';

  ngOnInit(): void {
    if (this.cookie.check('token')) {
      let token = this.cookie.get('token');
      // console.log('existing token : ' + token);
      this.share.setToken(token);
    }
    this.share.sharedToken.subscribe(token => {
      if (token != null) {
        this.cookie.set('token', token, 1);
        // console.log('set token : ' + token);
      }
    }
    );
  }
}
