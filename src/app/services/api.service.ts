import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9000/api-docs/';

  constructor(private http: HttpClient) { }

  getUsers(filter: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filter=${filter}`);
  }

  register(user: { name: string; email: string; password: string; age: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}