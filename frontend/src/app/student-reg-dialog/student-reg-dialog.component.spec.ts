import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegDialogComponent } from './student-reg-dialog.component';

describe('StudentRegDialogComponent', () => {
  let component: StudentRegDialogComponent;
  let fixture: ComponentFixture<StudentRegDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRegDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
