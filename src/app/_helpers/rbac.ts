import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3003/api/';
@Injectable({
  providedIn: 'root'
})
export class RBACService {

  constructor(private http: HttpClient, private authService: AuthService) { }
 
getRoles() :Observable<any>{
    let token = localStorage.getItem("token")
    if(token)
        return this.authService.getRoles(token)
    else
        return null as any
}



}