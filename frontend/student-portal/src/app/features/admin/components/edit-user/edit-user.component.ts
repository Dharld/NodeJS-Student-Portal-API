import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';
import { formatDate } from 'src/app/core/utils/moment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  errorMessage = '';

  currentUser = this.authService.getCurrentUser();
  editedUser: User | null = null;

  editUserForm!: FormGroup;

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.editedUser = navigation?.extras.state as User;

    this.editUserForm = this.fb.group({
      fname: [this.editedUser ? this.editedUser.USER_FNAME : ''],
      lname: [this.editedUser ? this.editedUser.USER_LNAME : ''],
      email: [this.editedUser ? this.editedUser.USER_EMAIL : ''],
      password: [this.editedUser ? this.editedUser.USER_PASSWORD : ''],
      role: [this.editedUser ? this.editedUser.USER_ROLE : ''],
      dob: [this.editedUser ? this.editedUser.USER_DOB : ''],
    });
  }

  submitForm() {
    const editUserForm = this.editUserForm.value;

    const userInf = {
      USER_ID: this.editedUser?.USER_ID,
      USER_FNAME: editUserForm['fname'],
      USER_LNAME: editUserForm['lname'],
      USER_EMAIL: editUserForm['email'],
      USER_PASSWORD: editUserForm['password'],
      USER_ROLE: editUserForm['role'],
      USER_DOB: formatDate(editUserForm['dob']),
    };

    const adminId = this.currentUser?.USER_ID;

    this.userService
      .editUser(userInf, adminId!)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.error.reason;
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.errorMessage = '';
      });
  }

  goBack() {
    this.navigationService.navigateTo(['../'], this.route);
  }
}
