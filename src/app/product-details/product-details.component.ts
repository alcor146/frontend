import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service.products';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  

  productId: string = "";
  productDetails: any = {}
  featuredImage: any
  images:any = []
  imagePositions = ["front", "back", "side"]
  role: string =""
  user: string = ""
  public isVisible: boolean = false;
  addedToCart: boolean = false;
  outOfStock: boolean = false;

  constructor(private route: ActivatedRoute , private router: Router, private http: HttpClient, private dialogService: DialogService, private rbacService: RBACService, private authService: AuthService){}
  
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null)
      this.productId = this.route.snapshot.paramMap.get('id') || ""
    console.log(this.productId)
    this.getRoles() 
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
      if(data.status == "200"){
        this.role = data.token.role
        this.user = data.token.userId
        this.showProduct();
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  showProduct(){

   this.http.get(`http://localhost:3001/api/products/${this.productId}`)
    .subscribe((res) => {
      let jsonString = JSON.stringify(res);
      let jsonDB = JSON.parse(jsonString);
      console.log(jsonDB);
      this.productDetails = jsonDB.data;
      this.getImages()
      this.imagePositions = []
    })
} 

  getImages(){
    for(let position of this.imagePositions){
      let image = {
        "src": `http://localhost:3001/static/${this.productDetails.name}_${position}.webp`,
        "classes": ["thumbnail"],
        "position": position
      }
      this.images.push(image)
    }
    this.images[0].classes.push("active")
    this.featuredImage = this.images[0]
  }

  onImageClick(newImage: any){
    for(let image of this.images){
      if(image.position == newImage.position){
        image.classes.push("active")
        this.featuredImage = image
      }else{
          if(image.classes.indexOf("active") != -1){
            image.classes.splice(image.classes.indexOf('active'), 1);
          }
      }
    }

  }

  addToCart(){
    if(this.productDetails.inStock == 0){
      this.outOfStock = true
      this.showAlert()
    }else {
      let body = {
        "name": this.productDetails.name,
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

openDeleteDialog(){
    
    this.dialogService.confirmDialog({
   
      message: "Are you sure you want to delete this?", 
      confirmText: 'Yes',
      cancelText: 'No'
    }).subscribe( ( result ) => {  
      if(result.toString() == "true"){ 
        this.http.delete(`http://localhost:3001/api/products/${this.productId}`)
        .subscribe((res) =>{
          let variabila = JSON.parse(JSON.stringify(res))
          if(variabila.success == true){
            this.router.navigate([`products`]);
          }
        })
      } else {
        console.log("NUUUUUUUUU");
      }
    });

  }

  openEditDialog(){
    
    this.dialogService.editDialog({
      id: this.productId,
      title: "edit dialog",
      name: this.productDetails.name,
      OS: this.productDetails.OS,
      internalMemory: this.productDetails.internalMemory,
      RAM: this.productDetails.RAM,
      processor: this.productDetails.processor,
      SIM: this.productDetails.SIM,
      SIMSlots: this.productDetails.SIMSlots,
      display: this.productDetails.display,
      displayResolution: this.productDetails.displayResolution,
      displayDimensions: this.productDetails.displayDimensions,
      dimensions: this.productDetails.dimensions,
      mainCamera: this.productDetails.mainCamera,
      frontalCamera: this.productDetails.frontalCamera,
      battery: this.productDetails.battery,
      price: this.productDetails.price,
      inStock: this.productDetails.inStock,
      confirmText: 'Edit'
    }).subscribe( ( newProduct ) => {  
      console.log(newProduct)
      if(newProduct.confirmText.toString() == "Edit"){   
        this.dialogService.confirmDialog({
          message: "Are you sure you want to edit this?", 
          confirmText: 'Yes',
          cancelText: 'No'
        }).subscribe( ( result ) => {  
          if(result.toString() == "true"){   
            console.log("productDetails edited");
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
              "inStock": newProduct.inStock,
            }

            this.http.put(`http://localhost:3001/api/products/${this.productId}`, body)
            .subscribe((res) => {
              console.log(res)
              let response = JSON.parse(JSON.stringify(res))
              this.showProduct()    
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
