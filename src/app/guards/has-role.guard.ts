import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RBACService } from '../_helpers/rbac';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {


    role: string = ""

    constructor(private rbacService: RBACService, private router: Router) {
    }

    async getRoles(){
        let data = await this.rbacService.getRoles().toPromise()
            if(data.status == "200"){
              this.role = data.token.role
            }

      }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let data = await this.rbacService.getRoles().toPromise()
            if(data.status == "200"){
              if(data.token.role == "admin"){
                console.log("yes2")
                return true
              }
              console.log("no2")
              this.router.navigate(['/products'])
              return false
            }
    console.log("no3")
    return false
  }
  
}
