import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface AppointmentTableItem {
  subject_name: string;
  tutor_name:string;
  student_name:string;
  date:string;
  start_time:string;
  end_time:string;
}


export class AppointmentTableDataSource extends DataSource<AppointmentTableItem> {
  data: AppointmentTableItem[] = [];

  constructor(d, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.data = d;
  }


  connect(): Observable<AppointmentTableItem[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}


  private getPagedData(data: AppointmentTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  private getSortedData(data: AppointmentTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'subject_name': return compare(a.subject_name, b.subject_name, isAsc);
        case 'tutor_name': return compare(a.tutor_name, b.tutor_name, isAsc);
        case 'student_name': return compare(a.student_name, b.student_name, isAsc);
        case 'date': return compare(a.date + " " + a.start_time, b.date + " " + b.start_time, isAsc);
        case 'start_time': return compare(a.start_time, b.start_time, isAsc);
        case 'end_time': return compare(a.end_time, b.end_time, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
