import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Assume you have an AuthService

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get the auth token from the service
  const authToken = authService.getToken();

  // Clone the request and add the authorization header if token exists
  const authReq = authToken 
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      })
    : req;

  // Send the cloned request with header to the next handler
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized responses
      if (error.status === 401) {
        authService.logout();
        router.navigate(['auth/login']);
      }

      // Handle 403 Forbidden responses
      if (error.status === 403) {
        // You might want to show an access denied message
        console.error('Access denied:', error.message);
      }

      // Re-throw the error for further handling by the calling service
      return throwError(() => error);
    })
  );
};