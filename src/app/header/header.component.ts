import { Component, OnInit } from '@angular/core';
//import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from '@angular/router';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: string | null = ""
  role: string = ""

  constructor( private router: Router, public rbacService: RBACService, public authService: AuthService){}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn")
    this.rbacService.getRoles().subscribe((data) =>{
   
      if(data.status == "200"){
        this.role = data.token.role
      }
    })
  }

  logOut(){
    this.authService.logOut()
    this.ngOnInit()
  }

}
