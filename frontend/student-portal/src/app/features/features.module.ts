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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './admin/components/edit-user/edit-user.component';
import { ListUsersComponent } from './admin/components/list-users/list-users.component';
import { ListCoursesComponent } from './admin/components/list-courses/list-courses.component';

@NgModule({
  declarations: [AdminComponent, CreateUserComponent, EditUserComponent, ListUsersComponent, ListCoursesComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
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
  ],
})
export class FeaturesModule {}
