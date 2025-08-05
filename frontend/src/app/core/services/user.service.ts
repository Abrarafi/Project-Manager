import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  protected override apiUrl = `${environment.apiUrl}/auth`;

  /**
   * This service provides methods to interact with user-related API endpoints.
   * It extends ApiService to leverage common HTTP methods.
   */
  // Note: The constructor initializes the base API URL and injects HttpClient.
  // It uses the environment configuration to set the API URL.
  // The ApiService class provides methods for making HTTP requests.
  constructor(protected override http: HttpClient) {
    super(http);
  }
  // http://localhost:5000/api/auth/users?search=john
  searchUsers(query: string): Observable<User[]> {
    return this.get<User[]>(`/users?search=${encodeURIComponent(query)}`);
  }
}
