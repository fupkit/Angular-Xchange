import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegDialogComponent } from './teacher-reg-dialog.component';

describe('TeacherRegDialogComponent', () => {
  let component: TeacherRegDialogComponent;
  let fixture: ComponentFixture<TeacherRegDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRegDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
