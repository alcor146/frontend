import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: string = ""
  userData: any = {}

  constructor(private http: HttpClient,  private rbacService: RBACService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
      if(data.status == "200"){
        this.user = data.token.userId
        this.showClientInformation();
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  showClientInformation(){
    this.http.post('http://localhost:3001/api/clients/user', {email: this.user}).subscribe((res)=> {
      this.userData = JSON.parse(JSON.stringify(res)).data[0]
      console.log(this.userData)
    })
  }

}
