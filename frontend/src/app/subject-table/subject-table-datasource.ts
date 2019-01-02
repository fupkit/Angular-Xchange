import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface SubjectTableItem{
  subject_id:number;
  subject_name:string;
  level:string;
  charge_per_hour:number;
}



export class SubjectTableDataSource extends DataSource<SubjectTableItem> {
  data: SubjectTableItem[] = [];

  constructor(d,private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.data=d;
  }


  connect(): Observable<SubjectTableItem[]> {

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

  private getPagedData(data: SubjectTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: SubjectTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'subject_name': return compare(a.subject_name, b.subject_name, isAsc);
        case 'level': return compare(a.level, b.level, isAsc);
        case 'cph': return compare(a.charge_per_hour, b.charge_per_hour, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
