import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service.products';
import { AuthService } from '../_services/auth.service';
import { RBACService } from '../_helpers/rbac';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  records: any = [];
  filterTerm: string = "";
  page: any;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : Array<number> = [3, 6, 9, 12]
  role: string =""
  user: any = ""
  userinfo: any = {}
  
  public isVisible: boolean = false;
  addedToCart: boolean = false;
  outOfStock: boolean = false;

  constructor(private http: HttpClient, private dialogService: DialogService, private authService: AuthService, private rbacService: RBACService) { 
  }

  ngOnInit(): void {
    console.log(this.authService.role)
    this.getRoles()
    this.showProducts();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showProducts();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showProducts();
  }

  showProducts(){

      this.http.get('http://localhost:3001/api/products')
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        this.records = jsonDB.data;
      })
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
      if(data.status == "200"){
        this.role = data.token.role
        this.user = data.token.userId
        this.showProducts();
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }


  openCreateDialog(){
  
    this.dialogService.createDialog({
      title: "create dialog",
      name: "",
      OS: "",
      internalMemory: "",
      RAM: "",
      processor: "",
      SIM: "",
      SIMSlots: "",
      display: "",
      displayResolution: "",
      displayDimensions: "",
      dimensions: "",
      mainCamera: "",
      frontalCamera: "",
      battery: "",
      price: "",
      inStock: "",
      confirmText: 'Create'
    }).subscribe( ( newProduct ) => {  
      console.log(newProduct)
      if(newProduct.confirmText.toString() == "Create"){   
        let body = {
          "name": newProduct.name,
          "OS": newProduct.OS,
          "internalMemory": newProduct.internalMemory,
          "RAM": newProduct.RAM,
          "processor": newProduct.processor,
          "SIM": newProduct.SIM,
          "SIMSlots": newProduct.SIMSlots,
          "display": newProduct.display,
          "displayResolution": newProduct.displayResolution,
          "displayDimensions": newProduct.displayDimensions,
          "dimensions": newProduct.dimensions,
          "mainCamera": newProduct.mainCamera,
          "frontalCamera": newProduct.frontalCamera,
          "battery": newProduct.battery,
          "price": newProduct.price,
          "inStock": newProduct.inStock
        }

        this.http.post(`http://localhost:3001/api/products`, body)
        .subscribe((res) =>{
          console.log(res)
        })
      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }

  addToCart(record: any){
    if(record.inStock == 0){
      this.outOfStock = true
      this.showAlert()
    }else {
      let body = {
        "name": record.name,
        "value": "1",
      }
      console.log(body)
      this.http.put(`http://localhost:3001/api/carts/${this.user}`, body)
      .subscribe((res) =>{
        let result = JSON.parse(JSON.stringify(res))
        console.log(result)
          this.addedToCart = true
          this.showAlert()
      })
    } 
  }


  showAlert() : void {
    if (this.isVisible) { // if the alert is visible return
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> {
      this.isVisible = false
      this.addedToCart = false
      this.outOfStock = false

    },2500); // hide the alert after 2.5s
  }
}
