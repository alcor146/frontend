import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service.products';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string = "";
  orderDetails: any = {}
  totalPrice: any = 0;


  constructor(private route: ActivatedRoute , private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null)
      this.orderId = this.route.snapshot.paramMap.get('id') || ""
    console.log(this.orderId)
    this.showOrder()
    
  }

  showOrder(){

    this.http.get(`http://localhost:3001/api/orders/${this.orderId}`)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);

      this.orderDetails = jsonDB.data;
      let body = {
        "email": this.orderDetails.createdBy
      }
      this.http.post(`http://localhost:3001/api/clients/user`, body)
      .subscribe((response) => {
        let client = JSON.parse(JSON.stringify(response)).data[0]
        this.orderDetails.clientName = client.name
        this.orderDetails.clientPhoneNumber = client.phoneNumber
        console.log(this.orderDetails)
        for(let record of this.orderDetails.products){
            this.totalPrice += record.count*record.price
        }
        console.log(this.totalPrice)
      })
    })
}


}
