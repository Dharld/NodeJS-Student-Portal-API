import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginInformations } from 'src/app/core/models/loginInf.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';

const ActiveRole = {
  1: 'Admin',
  2: 'Student',
  3: 'Teacher',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage = '';

  chipSelected: 1 | 2 | 3 = 1;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigation: NavigationService
  ) {}

  submitForm() {
    const loginInformations: LoginInformations = {
      email: this.loginForm.value['email']!,
      password: this.loginForm.value['password']!,
      role: ActiveRole[this.chipSelected],
    };
    this.authService
      .loginWithEmailAndPassword(loginInformations)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.error.reason;
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        if (res.success) {
          this.errorMessage = '';
          // console.log(res.data);
        } else {
          this.errorMessage = res.reason;
        }
      });
  }

  selectOption(index: 1 | 2 | 3) {
    this.chipSelected = index;
    console.log(ActiveRole[this.chipSelected]);
  }
}
