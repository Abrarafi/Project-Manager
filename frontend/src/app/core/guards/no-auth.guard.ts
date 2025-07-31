import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (this.authService.isAuthenticated()) {
          // User is already authenticated, redirect to dashboard
          return this.router.createUrlTree(['/dashboard']);
        } else {
          // User is not authenticated, allow access to login/register pages
          return true;
        }
      })
    );
  }
}
