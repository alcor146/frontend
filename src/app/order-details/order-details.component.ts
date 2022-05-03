import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service.products';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string = "";
  orderDetails: any = {}
  totalPrice: any = 0;
  records: any = ['New', 'On the way', 'Delivered', 'Canceled']
  orderStatus: any = ""
  role: any = ""



  constructor(private route: ActivatedRoute , private router: Router, private http: HttpClient, private rbacService: RBACService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null)
      this.orderId = this.route.snapshot.paramMap.get('id') || ""
    console.log(this.orderId)
    this.getRoles()
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
      if(data.status == "200"){
        this.role = data.token.role
        this.showOrder()
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  showOrder(){
    this.http.get(`http://localhost:3001/api/orders/${this.orderId}`)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);
      this.orderDetails = jsonDB.data;
      console.log(this.orderDetails.location)
      let body = {
        "email": this.orderDetails.createdBy
      }
      this.http.post(`http://localhost:3001/api/clients/user`, body)
      .subscribe((response) => {
        this.totalPrice = 0
        let client = JSON.parse(JSON.stringify(response)).data[0]
        
        this.orderDetails.clientName = client.name
        this.orderDetails.clientPhoneNumber = client.phoneNumber
        this.orderStatus = this.orderDetails.status
   
        console.log(this.role)
        for(let record of this.orderDetails.products){
            this.totalPrice += record.count*record.price
        }
        console.log(this.totalPrice)
      })
    })
}

  statusOnChange(status: any){

    let body = {
      status: status,
      email: this.orderDetails.createdBy
    }
   
  
    this.http.put(`http://localhost:3001/api/orders/${this.orderId}`, body)
        .subscribe((response) => {
       
          this.showOrder()
        })
  }


}
