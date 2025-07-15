import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}
  /**
   * This service provides methods to interact with the API.
   * It uses HttpClient to make HTTP requests.
   * The base URL for the API is defined in the environment configuration.
   */
  //fetch
  // Note: The method name 'get' is used for fetching data from the server.
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  // create
  // Note: The method name 'post' is used for creating new resources on the server.
  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  // update
  // Note: The method name 'put' is used for full updates, while 'patch' is used for partial updates.
  protected put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data);
  }

  // delete
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }
  
  // partial update
  protected patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, data);
  }
}
