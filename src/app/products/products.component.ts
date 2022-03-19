import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service.products';

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

  constructor(private http: HttpClient, private dialogService: DialogService) { 
  }

  ngOnInit(): void {
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
        console.log(jsonDB);
        this.records = jsonDB.data;
      })
  }

  // openDeleteDialog(record: any){
    
  //   this.dialogService.confirmDialog({
   
  //     message: "Are you sure you want to delete this?", 
  //     confirmText: 'Yes',
  //     cancelText: 'No'
  //   }).subscribe( ( result ) => {  
  //     if(result.toString() == "true"){
  //       console.log(record)   
  //       this.http.delete(`http://localhost:3001/api/products/${record._id}`)
  //       .subscribe((res) =>{
  //         console.log(res);
  //       })
  //     } else {
  //       console.log("NUUUUUUUUU");
  //     }
  //   });

  // }

  // openEditDialog(record: any){
    
  //   this.dialogService.editDialog({
  //     id: record._id,
  //     title: "edit dialog",
  //     name: record.name,
  //     OS: record.OS,
  //     internalMemory: record.internalMemory,
  //     RAM: record.RAM,
  //     processor: record.processor,
  //     SIM: record.SIM,
  //     SIMSlots: record.SIMSlots,
  //     display: record.display,
  //     displayResolution: record.displayResolution,
  //     displayDimensions: record.displayDimensions,
  //     dimensions: record.dimensions,
  //     mainCamera: record.mainCamera,
  //     frontalCamera: record.frontalCamera,
  //     battery: record.battery,
  //     price: record.price,
  //     inStock: record.inStock,
  //     confirmText: 'Edit'
  //   }).subscribe( ( newProduct ) => {  
  //     console.log(newProduct)
  //     if(newProduct.confirmText.toString() == "Edit"){   
  //       this.dialogService.confirmDialog({
  //         message: "Are you sure you want to edit this?", 
  //         confirmText: 'Yes',
  //         cancelText: 'No'
  //       }).subscribe( ( result ) => {  
  //         if(result.toString() == "true"){   
  //           console.log("record edited");
  //           let body = {
  //             "name": newProduct.name,
  //             "OS": newProduct.OS,
  //             "internalMemory": newProduct.internalMemory,
  //             "RAM": newProduct.RAM,
  //             "processor": newProduct.processor,
  //             "SIM": newProduct.SIM,
  //             "SIMSlots": newProduct.SIMSlots,
  //             "display": newProduct.display,
  //             "displayResolution": newProduct.displayResolution,
  //             "displayDimensions": newProduct.displayDimensions,
  //             "dimensions": newProduct.dimensions,
  //             "mainCamera": newProduct.mainCamera,
  //             "frontalCamera": newProduct.frontalCamera,
  //             "battery": newProduct.battery,
  //             "price": newProduct.price,
  //             "inStock": newProduct.inStock,
  //           }

  //           this.http.put(`http://localhost:3001/api/products/${record._id}`, body)
  //           .subscribe((res) => {
  //             console.log(res)
  //           });

  //         } else {
  //           console.log("NUUUUUUUUU edit");
  //         }
  //       });
  //     } else {
  //       console.log("NUUUUUUUUU");
  //     }
  //   });

  // }

  // openPreviewDialog(record: any){
  
  //   this.dialogService.previewDialog({
  //     title: "preview dialog",
  //     name: record.name,
  //     OS: record.OS,
  //     internalMemory: record.internalMemory,
  //     RAM: record.RAM,
  //     processor: record.processor,
  //     SIM: record.SIM,
  //     SIMSlots: record.SIMSlots,
  //     display: record.display,
  //     displayResolution: record.displayResolution,
  //     displayDimensions: record.displayDimensions,
  //     dimensions: record.dimensions,
  //     mainCamera: record.mainCamera,
  //     frontalCamera: record.frontalCamera,
  //     battery: record.battery,
  //     price: record.price,
  //     inStock: record.inStock
    
      
  //   }).subscribe( ( result ) => {  
  //     if(result.toString() == "false")   
  //       console.log("dialog closed");
  //   });
  // }

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
    
  }
}
