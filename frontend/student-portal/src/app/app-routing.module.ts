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
