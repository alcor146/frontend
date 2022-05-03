import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.orders';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  records: any = [];
  filterTerm: string = "";
  page: any;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : Array<number> = [3, 6, 9, 12]
  totalPrice: number =0
  role: string = ""
  user: string = ""
  clientName: string = ""
  clients: any = []

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private dialogService: DialogService, private rbacService: RBACService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.getRoles();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showOrders();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showOrders();
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
      if(data.status == "200"){
        this.user = data.token.userId
        this.role = data.token.role
        console.log(this.role)
        this.showOrders()
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  cancelOrder(record: any){

    let body = {
      status: "Canceled",
      email: record.createdBy
    }
   
  
    this.http.put(`http://localhost:3001/api/orders/${record._id}`, body)
        .subscribe((response) => {
       
          this.showOrders()
        })

  }

  // showClient(){
  //   if(this.role == "basic"){
  //     let body = {
  //       "email": this.user
  //     }
  //     this.http.post(`http://localhost:3001/api/clients/user`, body)
  //       .subscribe((response) => {
  //         this.clientName = JSON.parse(JSON.stringify(response)).data[0].name
  //         this.showOrders();
  //       })
  //   }else{
  //     this.http.get(`http://localhost:3001/api/clients`)
  //       .subscribe((response) => {
  //         this.clients = JSON.parse(JSON.stringify(response)).data
  //         console.log(this.clients)
  //         this.showOrders();
  //       })
  //   }
    
  // }

  showOrders(){
      if(this.role == "basic"){
        console.log(this.user)
        this.http.post('http://localhost:3001/api/orders/user', {createdBy: this.user})
        .subscribe((res) => {
          let jsonString = JSON.stringify(res);
          let jsonDB = JSON.parse(jsonString);
          this.records = jsonDB.data;
          console.log(this.records)
          for(let i=0; i<this.records.length; i++){
            for(let product of this.records[i].products ){
              this.totalPrice = this.totalPrice + product.price * product.count
            }
            this.records[i].price = this.totalPrice
            this.totalPrice = 0
          }
        })

      }else if (this.role == "admin"){
        this.http.get('http://localhost:3001/api/orders')
        .subscribe((res) => {
          let jsonString = JSON.stringify(res);
          let jsonDB = JSON.parse(jsonString);
          this.records = jsonDB.data;
          console.log(this.records)
          for(let i=0; i<this.records.length; i++){
            for(let product of this.records[i].products ){
              this.totalPrice = this.totalPrice + product.price * product.count
            }
            this.records[i].price = this.totalPrice
            this.totalPrice = 0
          }
        })
      }else{
        console.log("not an admin or user")
      }
      
  }

  redirectToOrder(orderId: any){
    this.router.navigate([`/orders/${orderId}`]);
  }


  
  openDeleteDialog(record: any){
    
    this.dialogService.confirmDialog({
    
      message: "Are you sure you want to delete this?", 
      confirmText: 'Yes',
      cancelText: 'No'
    }).subscribe( ( result ) => {  
      if(result.toString() == "true"){
      
        this.http.delete(`http://localhost:3001/api/orders/${record._id}`)
        .subscribe((res) =>{
          this.showOrders();
        
        })
      } else {
        console.log("NUUUUUUUUU");
      }
    });

  }


}
