import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:3003/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(AUTH_API + 'login', {
      email: email,
      password: password,
    }, httpOptions);
  }
  register(email: string, password: string, name: string, phoneNumber: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(AUTH_API + 'register', {
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      name: name
    }, httpOptions);
  }

  getToken(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    return this.http.post(AUTH_API + 'decodeToken', {
      
    }, httpOptions);
  }
}