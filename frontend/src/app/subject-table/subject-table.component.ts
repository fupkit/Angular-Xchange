import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SubjectTableDataSource } from './subject-table-datasource';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  regSubjects: [];
  dataSource: SubjectTableDataSource;

  displayedColumns = ['subject_name', 'level', 'cph'];
  constructor(private share: DataShareService) { }
  ngOnInit() {
    this.dataSource = new SubjectTableDataSource(this.regSubjects, this.paginator, this.sort);
    this.share.sharedSubjectList.subscribe((subjs) => {
      let a = JSON.stringify(subjs);
      let b = JSON.parse(a);

      this.regSubjects = b.filter(s=> s.registered == true);
      this.dataSource = new SubjectTableDataSource(this.regSubjects, this.paginator, this.sort);
    });
  }
}
