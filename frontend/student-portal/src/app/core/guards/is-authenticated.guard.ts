import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  currentUser$ = this.authService.currentUser$;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.currentUser$.pipe(
      tap((val) => {
        // console.log(val);
      }),
      map((user) => {
        if (user) {
          return true;
        }
        this.navigationService.navigateTo(['/auth/login']);
        return false;
      })
    );
  }
}
