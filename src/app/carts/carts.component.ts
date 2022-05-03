import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';
import { DialogService } from '../services/dialog.service.clients';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  records: any = [];
  role: any = "";
  totalPrice: number = 0;
  products: Map<string, number> = new Map();
  locationRecords: any = []
  cardRecords: any = []
  selectedLocation: any ={}
  selectedCard: any = {}
  user: any = ""
  userData: any = {}

  orderCreated: boolean = false
  modalCard: boolean = false
  modalLocation: boolean = false

  public isVisible: boolean = false;
  

  constructor(private http: HttpClient, private rbacService: RBACService, private authService: AuthService, private dialogService: DialogService ) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
   
      if(data.status == "200"){
        this.user = data.token.userId
        this.role = data.token.role
        console.log(this.role)
        this.showCartProducts();
        this.showCards()
        this.showLocations()
        this.showClient()
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  showCartProducts(){
    let body = {
      "createdBy": this.user,
    }
 

    this.http.post(`http://localhost:3001/api/carts/user`, body)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);
      console.log(jsonDB)
      this.selectedCard = jsonDB.data.card
      this.selectedLocation = jsonDB.data.location

   
     
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
          this.totalPrice = 0
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
    "createdBy": this.user,
  }

  this.http.post(`http://localhost:3001/api/locations/user`, body)
  .subscribe((res) =>{
    this.locationRecords = JSON.parse(JSON.stringify(res)).data
  })
}

showClient(){

  let body = {
    "email": this.user,
  }
  console.log(body)

  this.http.post(`http://localhost:3001/api/clients/user`, body)
  .subscribe((res) =>{
    this.userData = JSON.parse(JSON.stringify(res)).data[0]
    console.log(this.userData)
  })
}

showCards(){


  let body = {
    "createdBy": this.user,
  }

  this.http.post('http://localhost:3001/api/cards/user', body)
  .subscribe((res) => {
    this.cardRecords = JSON.parse(JSON.stringify(res)).data
  }) 
}

showCurrentCartDetails(){

  let body = {
    "createdBy": this.user,
  }
  

  this.http.post(`http://localhost:3001/api/carts/user`, body)
  .subscribe((res) =>{
    let response = JSON.parse(JSON.stringify(res))
    this.selectedCard = response.data.card
    this.selectedLocation = response.data.location
  })
}





onChange(value: number, recordName: string){

  let body = {
    "name": recordName,
    "value": value,
  }
  console.log(body)
  this.http.put(`http://localhost:3001/api/carts/${this.user}`, body)
  .subscribe((res) =>{
    let result = JSON.parse(JSON.stringify(res))
    console.log(result)
    this.showCartProducts();
  })
}


locationOnChange(location: any){
 
  let body = {
    "location": location
  }
  this.http.put(`http://localhost:3001/api/carts/changeDetails/${this.user}`, body)
  .subscribe((res) =>{
    console.log(res)
    this.showCurrentCartDetails()
  })
}

cardOnChange(card: any){

  let body = {
    "card": card
  }
  this.http.put(`http://localhost:3001/api/carts/changeDetails/${this.user}`, body)
  .subscribe((res) =>{
    this.showCartProducts();
  })
}

onclose(name: string){
  let body = {
    "name": name,
    "value": null,
  }
  this.http.put(`http://localhost:3001/api/carts/${this.user}`, body)
  .subscribe((res) =>{
    let result = JSON.parse(JSON.stringify(res))
    console.log(result)
    this.showCartProducts();

  })

}

createOrder(){
  console.log(this.records)
  console.log("LOCATION",this.selectedLocation)
  console.log("CARD",this.selectedCard)

  if(Object.keys(this.selectedLocation).length === 0){
    this.modalLocation = true
    this.showAlert()
  }else if(Object.keys(this.selectedCard).length === 0){
    this.modalCard = true
    this.showAlert()
  }else{
    let body = {
      "createdBy": this.user,
      "products": this.records,
      "location": this.selectedLocation,
      "card": this.selectedCard
    }

    this.http.post(`http://localhost:3001/api/orders`, body)
    .subscribe((res) =>{
   
      this.http.post(`http://localhost:3001/api/carts/emptyCart`, body)
    .subscribe((res) =>{
      this.orderCreated = true
      this.showAlert()
      this.showCartProducts();
    })
    })
  }
}


createArray(N: any) {
  const array = Array.from({length: N}, (_, index) => index + 1);
  return array
}


showAlert() : void {
  if (this.isVisible) { // if the alert is visible return
    return;
  } 
  this.isVisible = true;
  setTimeout(()=> {
    this.isVisible = false
    this.orderCreated = false
    this.modalCard = false
    this.modalLocation = false
  },2500); // hide the alert after 2.5s
}

openEditDialog(){
    
  this.dialogService.profileEditDialog({
    id: this.userData._id,
    title: "edit dialog",
    name: this.userData.name,
    phoneNumber: this.userData.phoneNumber,
    confirmText: 'Edit'
  }).subscribe( ( newClient ) => {  
    console.log(newClient)
    if(newClient.confirmText.toString() == "Edit"){   
      this.dialogService.confirmDialog({
        message: "Are you sure you want to edit this?", 
        confirmText: 'Yes',
        cancelText: 'No'
      }).subscribe( ( result ) => {  
        if(result.toString() == "true"){   
          console.log("record edited");
          let body = {
            "role": this.userData.role,
            "email": this.userData.email,
            "name": newClient.name,
            "phoneNumber": newClient.phoneNumber,
            "password": this.userData.password,
          }

          this.http.put(`http://localhost:3001/api/clients/${this.userData._id}`, body)
          .subscribe((res) => {
            this.showClient()
         
          });

        } else {
          console.log("NUUUUUUUUU edit");
        }
      });
    } else {
      console.log("NUUUUUUUUU");
    }
  });

}



}
