import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { AdminComponent } from './features/admin/admin.component';
import { CreateUserComponent } from './features/admin/components/create-user/create-user.component';
import { IsAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { EditUserComponent } from './features/admin/components/edit-user/edit-user.component';
import { ListUsersComponent } from './features/admin/components/list-users/list-users.component';
import { ListCoursesComponent } from './features/admin/components/list-courses/list-courses.component';
import { CreateCourseComponent } from './features/admin/components/create-course/create-course.component';
import { EditCourseComponent } from './features/admin/components/edit-course/edit-course.component';
import { StudentComponent } from './features/student/student.component';
import { RegistrationComponent } from './features/student/component/registration/registration.component';
import { CoursesComponent } from './features/student/component/courses/courses.component';
import { GradesComponent } from './features/student/component/grades/grades.component';
import { ListRegistrationsComponent } from './features/admin/components/list-registrations/list-registrations.component';
import { TeacherComponent } from './features/teacher/teacher.component';
import { NoCourseComponent } from './features/teacher/components/no-course/no-course.component';
import { CourseDetailsComponent } from './features/teacher/components/course-details/course-details.component';
import { CreateClassComponent } from './features/teacher/components/create-class/create-class.component';
import { MarkAttendanceComponent } from './features/teacher/components/mark-attendance/mark-attendance.component';
import { CreateEvaluationComponent } from './features/teacher/components/create-evaluation/create-evaluation.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'users',
        component: ListUsersComponent,
      },
      {
        path: 'courses',
        component: ListCoursesComponent,
      },
      {
        path: 'registrations',
        component: ListRegistrationsComponent,
      },
      {
        path: 'create',
        component: CreateUserComponent,
        outlet: 'other',
      },
      {
        path: 'edit',
        component: EditUserComponent,
        outlet: 'other',
      },
      {
        path: 'createCourse',
        component: CreateCourseComponent,
        outlet: 'other',
      },
      {
        path: 'editCourse',
        component: EditCourseComponent,
        outlet: 'other',
      },
    ],
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'grades', component: GradesComponent },
    ],
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: NoCourseComponent,
      },
      {
        path: 'courses/:courseId',
        component: CourseDetailsComponent,
        children: [
          { path: 'createEvaluation', component: CreateEvaluationComponent },
          { path: 'createClass', component: CreateClassComponent },
          { path: ':classId', component: MarkAttendanceComponent },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
