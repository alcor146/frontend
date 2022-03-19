import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tfaFlag: boolean = false
  userObject = {
    uname: "",
    upass: "",
    authcode: ""
  }

  userObject1 = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  }



  errorMessage: string = "null"
  constructor( private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    
  }



  registerUser() {
    
  }







  // async onRegister(name: string, phoneNumber: string, email: string, password: string) {
  //   console.log(name, phoneNumber, email, password)
  // }

  // async onLogin(email: string, password: string) {
  //   console.log(email, password)
  // }

  
}
