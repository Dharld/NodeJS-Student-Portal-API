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
        outlet: 'content',
      },
      {
        path: 'courses',
        component: ListCoursesComponent,
        outlet: 'content',
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'edit-user',
        component: EditUserComponent,
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
