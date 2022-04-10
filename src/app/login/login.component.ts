import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent implements OnInit {

  loginModel = {
    email: "",
    password: ""
  }

  registerModel = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  user: any

  
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 

  constructor( private _router: Router, private http: HttpClient) {

  }


  ngOnInit() {
  }

  login() {
    if(this.loginModel.email == "" || this.loginModel.password == "")
      alert("All fields are required")
    else if(!this.loginModel.email.match(this.validRegex))
      alert("not an email")
    else{

      let body = {
        "email": this.loginModel.email ,
        "password": this.loginModel.password
      }

      this.http.post('http://localhost:3003/api/clients/login', body)
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB.data)
        let localData = {
          email: jsonDB.data[0].email,
          password: jsonDB.data[0].password
        }
        console.log(localData)
        localStorage.setItem('client', JSON.stringify(localData));
      })
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
      console.log(this.registerModel.name)
      console.log(this.registerModel.phoneNumber)
      console.log(this.registerModel.email)
      console.log(this.registerModel.password)
      console.log(this.registerModel.confirmPassword)
      let body = {
        "email": this.loginModel.email ,
        "password": this.loginModel.password
      }
      this.http.post('http://localhost:3003/api/clients/login', body)
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB);
        this.user = jsonDB.data;
      })
    }
  }

  
}
