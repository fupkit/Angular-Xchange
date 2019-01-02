import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LayoutModule } from '@angular/cdk/layout';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoginFormComponent } from './user-form/login-form/login-form.component';
import { RegFormComponent } from './user-form/reg-form/reg-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Service } from './services';
import { DataShareService } from './data-share.service';
import { BodyComponent } from './body/body.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { SubjectTableComponent } from './subject-table/subject-table.component';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { SubjectFormComponent } from './teacher/subject-form/subject-form.component';
import { AppointmentFormComponent } from './student/appointment-form/appointment-form.component';
import { TeacherRegDialogComponent } from './teacher-reg-dialog/teacher-reg-dialog.component';
import { StudentRegDialogComponent } from './student-reg-dialog/student-reg-dialog.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LoginFormComponent,
    RegFormComponent,
    UserFormComponent,
    BodyComponent,
    MainPageComponent,
    TeacherComponent,
    StudentComponent,
    SubjectTableComponent,
    AppointmentTableComponent,
    SubjectFormComponent,
    AppointmentFormComponent,
    TeacherRegDialogComponent,
    StudentRegDialogComponent,
    BookingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule,
    HttpClientModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatSlideToggleModule
  ],
  providers: [Service, DataShareService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent,
    SubjectFormComponent,
    AppointmentFormComponent,
    TeacherRegDialogComponent,
    StudentRegDialogComponent],
})
export class AppModule { }
