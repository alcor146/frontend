import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  records: any = [];
  role: any = "admin";
  totalPrice: number = 0;
  products: Map<string, number> = new Map();
  

  constructor(private http: HttpClient, ) { }

  ngOnInit(): void {
    this.showCartProducts();
  }

  showCartProducts(){

  
    this.http.get(`http://localhost:3001/api/carts/${this.role}`)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);
      console.log(jsonDB);
      this.products = jsonDB.data.products;
    
      let recordsList = []
      let recordCount:any = []
      
      for (const [key, value] of Object.entries(this.products)) {
        recordsList.push(key)
        recordCount.push(value)
      }

      let body = {
        "productList": recordsList
      }

      //console.log(recordsList)
      this.http.post(`http://localhost:3001/api/products/cart`, body)
        .subscribe((res) =>{
          let result = JSON.parse(JSON.stringify(res)).data

          for(let i=0; i<Object.keys(result).length; i++){
            result[i].count = recordCount[i];
            this.totalPrice = this.totalPrice + Number(result[i].price)*recordCount[i]
          }
          this.records = result
          console.log(this.records)
          console.log(this.totalPrice)
        })

    })
}


onChange(value: number, recordName: string){
 
  let body = {
    "name": recordName,
    "value": value,
  }
  console.log(body)
  this.http.put(`http://localhost:3001/api/carts/${this.role}`, body)
  .subscribe((res) =>{
    let result = JSON.parse(JSON.stringify(res))
    console.log(result)
  })
}

}
