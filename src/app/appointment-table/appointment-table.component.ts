import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppointmentTableDataSource } from './appointment-table-datasource';
import { DataShareService } from '../data-share.service';


@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() title: string;
  @Input() type: string;
  appointments: [] = [];
  dataSource: AppointmentTableDataSource;

  displayedColumns = ['subject_name', 'tutor_name', 'student_name', 'date', 'start_time', 'end_time'];
  constructor(private share: DataShareService) { }
  ngOnInit() {
    this.dataSource = new AppointmentTableDataSource(this.appointments, this.paginator, this.sort);
    if (this.type === 'student') {
      this.title = "My Studies";
      this.share.sharedStuAppointmentList.subscribe((apps) => {
        let a = JSON.stringify(apps);
        this.appointments = JSON.parse(a);
        this.dataSource = new AppointmentTableDataSource(this.appointments, this.paginator, this.sort);
      })
    }
    else {
      
      this.share.sharedAppointmentList.subscribe((apps) => {
        let a = JSON.stringify(apps);
        this.appointments = JSON.parse(a);
        this.dataSource = new AppointmentTableDataSource(this.appointments, this.paginator, this.sort);
      });
    }
    if (this.type === 'teacher') {
      this.title = "My Teaching";
    }
  }
}

