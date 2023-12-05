import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserComponent } from './admin/components/create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './admin/components/edit-user/edit-user.component';
import { ListUsersComponent } from './admin/components/list-users/list-users.component';
import { ListCoursesComponent } from './admin/components/list-courses/list-courses.component';
import { CreateCourseComponent } from './admin/components/create-course/create-course.component';
import { EditCourseComponent } from './admin/components/edit-course/edit-course.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentComponent } from './student/student.component';
import { RegistrationComponent } from './student/component/registration/registration.component';
import { CoursesComponent } from './student/component/courses/courses.component';
import { GradesComponent } from './student/component/grades/grades.component';
import { ListRegistrationsComponent } from './admin/components/list-registrations/list-registrations.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseDetailsComponent } from './teacher/components/course-details/course-details.component';
import { NoCourseComponent } from './teacher/components/no-course/no-course.component';
import { ClassesComponent } from './teacher/components/classes/classes.component';
import { AttendancesComponent } from './teacher/components/attendances/attendances.component';
import { EvaluationsComponent } from './teacher/components/evaluations/evaluations.component';
import { CreateClassComponent } from './teacher/components/create-class/create-class.component';
import { MarkAttendanceComponent } from './teacher/components/mark-attendance/mark-attendance.component';
import { CreateEvaluationComponent } from './teacher/components/create-evaluation/create-evaluation.component';
import { GradeEvaluationComponent } from './teacher/components/grade-evaluation/grade-evaluation.component';

@NgModule({
  declarations: [
    AdminComponent,
    CreateUserComponent,
    EditUserComponent,
    ListUsersComponent,
    ListCoursesComponent,
    CreateCourseComponent,
    EditCourseComponent,
    StudentComponent,
    RegistrationComponent,
    CoursesComponent,
    GradesComponent,
    ListRegistrationsComponent,
    TeacherComponent,
    CourseDetailsComponent,
    NoCourseComponent,
    ClassesComponent,
    AttendancesComponent,
    EvaluationsComponent,
    CreateClassComponent,
    MarkAttendanceComponent,
    CreateEvaluationComponent,
    GradeEvaluationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,

    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,

    MatTabsModule,
    MatCheckboxModule,
  ],
})
export class FeaturesModule {}
