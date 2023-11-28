import { formatDate } from 'src/app/core/utils/moment';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupCred } from 'src/app/core/models/signupCred.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    lname: [''],
    fname: [''],
    dob: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navigation: NavigationService
  ) {}

  submitForm() {
    const signupForm = this.signupForm.value;
    let lname = signupForm.lname!;
    let fname = signupForm.fname!;
    let dob = formatDate(signupForm.dob);
    let email = signupForm.email!;
    let password = signupForm.password!;

    let userCreds: SignupCred = {
      lname,
      fname,
      dob,
      email,
      password,
    };

    this.auth
      .signupWithEmailAndPassword(userCreds)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((res) => {
        console.log('The user has been created successfully!');
      });
  }
}
