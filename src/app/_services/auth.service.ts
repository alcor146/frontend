import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:3003/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isLoggedIn: boolean = false
  public role: string = ""

  constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(AUTH_API + 'login', {
      email: email,
      password: password,
    }, httpOptions);
  }
  register(email: string, password: string, passwordConfirmation: string, name: string, phoneNumber: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        observe: 'response' })
    };
    return this.http.post(AUTH_API + 'register', {
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      name: name,
      passwordConfirmation: passwordConfirmation
    }, httpOptions);
  }

  getRoles(token: any): Observable<any> {
    if(token == null)
      return null as any
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    return this.http.get(AUTH_API + 'decodeToken', httpOptions);
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }



}