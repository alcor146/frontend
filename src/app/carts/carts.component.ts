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
  selectedLocation: any ={}
  selectedCard: any = {}
  

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
      this.selectedCard = jsonDB.data.card
      this.selectedLocation = jsonDB.data.location
      // console.log(this.selectedLocation.county)
      // console.log(this.selectedCard.bank)
      const map = new Map(Object.entries(jsonDB.data.products));
      this.products = jsonDB.data.products;
    
      let recordsList = []
      
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


locationOnChange(location: any){
 
  let body = {
    "location": location
  }
  this.http.put(`http://localhost:3001/api/carts/changeDetails/${this.role}`, body)
  .subscribe((res) =>{
    console.log(res)
  })
}

cardOnChange(card: any){

  let body = {
    "card": card
  }
  this.http.put(`http://localhost:3001/api/carts/changeDetails/${this.role}`, body)
  .subscribe((res) =>{

  })
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

createOrder(){
  console.log(this.records)
  console.log(this.selectedLocation)
  console.log(this.selectedCard)

    let body = {
      "createdBy": this.role,
      "products": this.records,
      "location": this.selectedLocation,
      "card": this.selectedCard
    }

    this.http.post(`http://localhost:3001/api/orders`, body)
    .subscribe((res) =>{
   
      this.http.post(`http://localhost:3001/api/carts/emptyCart`, body)
    .subscribe((res) =>{
    })
    })
}


createArray(N: any) {
  const array = Array.from({length: N}, (_, index) => index + 1);
  return array
}
}
