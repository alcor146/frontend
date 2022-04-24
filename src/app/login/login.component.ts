import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router'
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent implements OnInit {

  registerModel = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  isSuccessful = false;
  isSignUpFailed = false;

  loginModel = {
    email: "",
    password: ""
  }
  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];
  user: any

  
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 

  constructor( private router: Router, private http: HttpClient, private authService: AuthService) {

  }


  ngOnInit() {
   
  }

  login() {
    if(this.loginModel.email == "" || this.loginModel.password == "")
      alert("All fields are required")
    else if(!this.loginModel.email.match(this.validRegex))
      alert("not an email")
    else{
      this.authService.login(this.loginModel.email, this.loginModel.password).subscribe((data) => {
          console.log(data)
          if(data.status != "200"){
            console.log("login failed")
          }else{
            localStorage.setItem('token', data["token"]);
            localStorage.setItem('isLoggedIn', "true");
            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });
          }
        }
      );
    } 
  }



  register() {

    if(this.registerModel.name == "" || this.registerModel.phoneNumber == "" || this.registerModel.email == "" || this.registerModel.password == "" || this.registerModel.confirmPassword == "")
      alert("All fields are required")
    else if(this.registerModel.password !== this.registerModel.confirmPassword)
      alert("Confirm password is different from the Password")
    else if(!this.registerModel.email.match(this.validRegex))
      alert("not an email")
    else{
      this.authService.register(this.registerModel.email, this.registerModel.password, this.registerModel.confirmPassword, this.registerModel.name, this.registerModel.phoneNumber).subscribe(
        data => {
          let body = {
            "createdBy": this.registerModel.email
          }
  
          this.http.post(`http://localhost:3001/api/carts`, body)
          .subscribe((res) =>{
            console.log(res)
          })
        },
        err => {
          
        }
      );
     
    }
  }

  
}
