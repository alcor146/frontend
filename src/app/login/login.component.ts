import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router'
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { DialogService } from '../services/dialog.service.clients';



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




  loginModel = {
    email: "",
    password: ""
  }
  isLoggedIn = false;
  isLoginFailed = false;
  public isVisible: boolean = false;

  allFieldsRequired: boolean = false;
  passwordsDontMatch: boolean = false;
  invalidEmail: boolean = false;
  wrongCredentials: boolean = false;
  emailAlreadyUsed: boolean = false;
  registerSuccessfully: boolean = false;

  passwordChanged: boolean = false;
  noSuchUser: boolean = false;
  
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 

  constructor( private router: Router, private http: HttpClient, private authService: AuthService, private dialogService: DialogService) {

  }


  ngOnInit() {
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    if(isLoggedIn!= undefined && isLoggedIn == "true")
            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });

  }

  login() {
    if(this.loginModel.email == "" || this.loginModel.password == ""){
      this.allFieldsRequired = true
      this.showAlert()
      
    }
    else if(!this.loginModel.email.match(this.validRegex)){
      this.invalidEmail = true
      this.showAlert()
    }
    else{
      this.authService.login(this.loginModel.email, this.loginModel.password).subscribe((data) => {
          console.log(data)
          if(data["status"] == "421"){
            this.wrongCredentials = true
            this.showAlert()
          }else if (data["status"] == "200"){
            localStorage.setItem('token', data["token"]);
            localStorage.setItem('isLoggedIn', "true");
            this.authService.role = data["role"]
            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });
          }
        }
      );
    } 
  }



  register() {

    if(this.registerModel.name == "" || this.registerModel.phoneNumber == "" || this.registerModel.email == "" || this.registerModel.password == "" || this.registerModel.confirmPassword == ""){
      this.allFieldsRequired = true
      this.showAlert()
    }
      
    else if(this.registerModel.password !== this.registerModel.confirmPassword){
      this.passwordsDontMatch = true
      this.showAlert()
    }
    else if(!this.registerModel.email.match(this.validRegex)){
      this.invalidEmail = true
      this.showAlert()
    }
    else{
      this.authService.register(this.registerModel.email, this.registerModel.password, this.registerModel.confirmPassword, this.registerModel.name, this.registerModel.phoneNumber).subscribe(
        response => {
          let body = {
            "createdBy": this.registerModel.email
          }
          if(response["status"] == "421"){
            this.emailAlreadyUsed = true
            this.showAlert()
          }
          else{
            this.http.post(`http://localhost:3001/api/carts`, body)
            .subscribe((res) =>{
              this.registerSuccessfully = true
              this.showAlert()
            })
          }
         
        },
        err => {
          console.log(err)
        }
      );
     
    }
  }


  showAlert() : void {
    if (this.isVisible) { // if the alert is visible return
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> {
      this.isVisible = false
      if(this.allFieldsRequired == true)
        this.allFieldsRequired = false
      else if(this.emailAlreadyUsed == true)
          this.emailAlreadyUsed = false
      else if(this.passwordsDontMatch == true)
          this.passwordsDontMatch = false
      else if(this.invalidEmail == true)
          this.invalidEmail = false
      else if(this.wrongCredentials == true)
          this.wrongCredentials = false
      else if(this.registerSuccessfully == true)
          this.registerSuccessfully = false
      else if(this.noSuchUser == true)
          this.noSuchUser = false
      else if(this.passwordChanged == true)
          this.passwordChanged = false
    },2500); // hide the alert after 2.5s
  }


  changePassword(){

    this.dialogService.passwordEditDialog({
      title: "title",
      email: "",
      confirmText: 'Change password'
    }).subscribe((newPassword) =>{
      console.log(newPassword)
      if(newPassword.confirmText.toString() == "Change password"){
        let body = {
          "email": newPassword.email
        }
  
        this.http.put(`http://localhost:3003/api/changePassword`, body)
                .subscribe((res) =>{
                  let result = JSON.parse(JSON.stringify(res))
                  console.log(result.status)
                  if(result.status == "401"){
                    this.noSuchUser = true;
                  }else if(result.status == "200"){
                    this.passwordChanged = true
                  }else{
                    console.log("Change Password error")
                  }
                  this.showAlert()
                })
      }
    })

    
  }
  



  
}
