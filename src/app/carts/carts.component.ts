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
  locationRecords: any = []
  cardRecords: any = []
  selectedLocation: any
  selectedCard: any
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showCartProducts();
    this.showCards()
    this.showLocations()
  }

  showCartProducts(){

    let body = {
      "createdBy": this.role,
    }

    this.http.post(`http://localhost:3001/api/carts/user`, body)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);
      console.log(jsonDB);
      const map = new Map(Object.entries(jsonDB.data.products));
      this.products = jsonDB.data.products;
    
      let recordsList = []
      let recordCount:any = []
      
      for (const [key, value] of Object.entries(this.products)) {
        recordsList.push(key)
      }
   

      let body = {
        "productList": recordsList
      }

      //console.log(recordsList)
      this.http.post(`http://localhost:3001/api/products/cart`, body)
        .subscribe((res) =>{
          let result = JSON.parse(JSON.stringify(res)).data

          for(let i=0; i<Object.keys(result).length; i++){
            result[i].count = map.get(result[i].name);
            this.totalPrice = this.totalPrice + Number(result[i].price)*Number(result[i].count)
          }
          this.records = result
        })

    })
} 

showLocations(){

  let body = {
    "createdBy": this.role,
  }

  this.http.post(`http://localhost:3001/api/locations/user`, body)
  .subscribe((res) =>{
    this.locationRecords = JSON.parse(JSON.stringify(res)).data
  })
}

showCards(){


  let body = {
    "createdBy": this.role,
  }

  this.http.post('http://localhost:3001/api/cards/user', body)
  .subscribe((res) => {
    this.cardRecords = JSON.parse(JSON.stringify(res)).data
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


locationOnChange(value: any){
  this.selectedLocation = value
  console.log(this.selectedLocation)
}

cardOnChange(value: any){
  this.selectedCard = value
  console.log(this.selectedCard)
}

onclose(name: string){
  let body = {
    "name": name,
    "value": null,
  }
  this.http.put(`http://localhost:3001/api/carts/${this.role}`, body)
  .subscribe((res) =>{
    let result = JSON.parse(JSON.stringify(res))
    console.log(result)

  })

}

addToCart(){
  console.log(this.records)
  console.log(this.selectedLocation)
  console.log(this.selectedCard)

    let body = {
      "createdBy": this.role,
      "products": this.records,
      "location": this.selectedLocation,
    }

    this.http.post(`http://localhost:3001/api/orders`, body)
    .subscribe((res) =>{
      console.log(res)
    })
}

}
