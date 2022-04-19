import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.orders';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    this.showOrders();
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

  showOrders(){

      this.http.get('http://localhost:3001/api/orders')
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        this.records = jsonDB.data;
        console.log(this.records)
        for(let i=0; i<this.records.length; i++){
          //console.log(this.records[i].products)
          for(let product of this.records[i].products ){
            this.totalPrice = this.totalPrice + product.price * product.count
          }
          this.records[i].price = this.totalPrice
          this.totalPrice = 0
        }

    
      })
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
