import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { Service } from '../services';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(
    private share: DataShareService,
    private service: Service
  ) { }

  ngOnInit() {
    let token = this.share.getToken();
    this.service.getBookingsFromTutor(token).subscribe((res) => {
      // console.log(res);
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if (r.result) {
        this.share.setAppointments(r.bookings);
      } else {
        // alert(r.message);
      }
    });
    this.service.getBookingsFromStudent(token).subscribe((res) => {
      // console.log(res);
      let temp = JSON.stringify(res);
      let r = JSON.parse(temp);
      if (r.result) {
        this.share.setStuAppointments(r.bookings);
      } else {
        // alert(r.message);
      }
    });
  }

}
