import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private router: Router, private share: DataShareService) { }

  ngOnInit() {
    this.share.sharedUser.subscribe((user) => {
      if(user == null) {
        this.routeBacktoMain();
      }
    })
  }

  routeBacktoMain() {
    this.router.navigate(['']);
  }

}
