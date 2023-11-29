import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { SignupCred } from '../models/signupCred.model';
import { API_URL } from 'src/environments/environment';
import { tap } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { NavigationService } from './navigation.service';
import { LoginInformations } from '../models/loginInf.model';
import { Router, RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiSuffix = 'api/v1/auth';

  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private snackService: SnackbarService,
    private navigation: NavigationService,
    private router: Router
  ) {}

  getCurrentUser() {
    return this.currentUser.getValue();
  }

  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  signupWithEmailAndPassword(userCreds: SignupCred) {
    const finalUrl = this.apiSuffix + '/signup';
    return this.http.post<any>(finalUrl, userCreds).pipe(
      tap(({ success, data }) => {
        if (success) {
          this.snackService
            .openSnackBar('The user has been created successfully', 'OK')
            .subscribe(() => {
              this.navigation.navigateTo(['admin']);
            });

          this.setCurrentUser(data);
        }
      })
    );
  }

  loginWithEmailAndPassword(creds: LoginInformations) {
    let params = new HttpParams();
    params = params.set('role', creds.role);
    const finalUrl = this.apiSuffix + '/login';
    return this.http
      .post<any>(
        finalUrl,
        { email: creds.email, password: creds.password },
        {
          params,
        }
      )
      .pipe(
        tap(({ success, data }) => {
          if (success) {
            this.snackService
              .openSnackBar('You are successfully logged in', 'OK')
              .subscribe(() => {
                this.setCurrentUser(data);
                this.router.navigate(['admin', 'users']);
              });
          }
        })
      );
  }

  logout() {
    this.setCurrentUser(null);
    this.navigation.navigateTo(['auth', 'login']);
  }
}
