import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from '../../shared/models/user.model';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../../shared/models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  protected override apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(protected override http: HttpClient, private router: Router) {
    super(http);
    this.loadCurrentUser();
  }
  private loadCurrentUser(): void {
    const userJson = localStorage.getItem('currentUser');

    if (userJson) {
      try {
        const user: User = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.clearUserData();
      }
    }
  }

  register(userData: Partial<User>): Observable<User> {
    return this.post<User>('/register', userData);
  }

  login(email: string, password: string): Observable<User> {
    return this.post<AuthResponse>('/login', { email, password }).pipe(
      tap((response) => {
        const partialUser = {
          id: response.id,
          email: response.email,
          firstName: response.firstName, // Fixed typo from 'fistName'
          lastName: response.lastName,
          token: response.token,
        };
        localStorage.setItem('currentUser', JSON.stringify(partialUser));
        this.currentUserSubject.next(partialUser);
      }),
      switchMap(() => this.getProfile()), // <- load full profile after login

      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Invalid email or password'));
      })
    );
  }

  // getProfile(): Observable<User> {
  //   return this.get<User>('/profile').pipe(
  //     tap((profile) => {
  //       const currentUser = this.getCurrentUser();
  //       const updatedUser: User = {
  //         ...profile,
  //         token: currentUser?.token, // Preserve the token
  //       };
  //       console.log('Fetched user profile:', updatedUser);

  //       this.storeUserData(updatedUser);
  //     }),
  //     catchError((error) => {
  //       console.error('Failed to fetch profile', error);
  //       return throwError(() => new Error('Failed to load user profile'));
  //     })
  //   );
  // }
  getProfile(): Observable<User> {
    return this.get<{ status: string; data: { user: User } }>('/profile').pipe(
      map((res) => res.data.user), // <-- extract the real user object
      tap((profile) => {
        const currentUser = this.getCurrentUser();
        const updatedUser: User = {
          ...profile,
          token: currentUser?.token,
        };
        console.log('Fetched user profile:', updatedUser);
        this.storeUserData(updatedUser);
      }),
      catchError((error) => {
        console.error('Failed to fetch profile', error);
        return throwError(() => new Error('Failed to load user profile'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
    // this.post('/signout', {}).subscribe({
    //   next: () => {
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //     this.router.navigate(['/auth/login']);
    //   },
    //   error: () => {
    //     // Even if the backend fails, clear local state
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //     this.router.navigate(['/auth/login']);
    //   }
    // });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return !!user && !!user.token;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user?.token || null;
  }

  private clearUserData(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  private storeUserData(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
