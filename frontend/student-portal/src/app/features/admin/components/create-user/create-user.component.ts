import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';
import { formatDate } from 'src/app/core/utils/moment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  errorMessage = '';

  currentUser = this.authService.getCurrentUser();

  createUserForm = this.fb.group({
    fname: [''],
    lname: [''],
    email: [''],
    password: [''],
    role: [''],
    dob: [''],
  });

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitForm() {
    const createUserForm = this.createUserForm.value;
    const userInf = {
      fname: createUserForm['fname'],
      lname: createUserForm['lname'],
      email: createUserForm['email'],
      password: createUserForm['password'],
      role: createUserForm['role'],
      dob: formatDate(createUserForm['dob']),
    };

    const adminId = this.currentUser?.USER_ID;

    this.userService
      .createUser(userInf, adminId!)
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
    this.router.navigate(['admin', 'users', { outlets: { other: null } }]);
  }
}
