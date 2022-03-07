import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.locations';

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

  constructor(private http: HttpClient, private dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    this.showLocations();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showLocations();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showLocations();
  }

  showLocations(){

      this.http.get('http://localhost:3001/api/locations')
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB);
        this.records = jsonDB.data;
      })
  }
  
  openDeleteDialog(record: any){
    
    this.dialogService.confirmDialog({
    
      message: "Are you sure you want to delete this?", 
      confirmText: 'Yes',
      cancelText: 'No'
    }).subscribe( ( result ) => {  
      if(result.toString() == "true"){
        console.log(record)   
        this.http.delete(`http://localhost:3001/api/locations/${record._id}`)
        .subscribe((res) =>{
          console.log(res);
        })
      } else {
        console.log("NUUUUUUUUU");
      }
    });

  }

  openEditDialog(record: any){
    
    this.dialogService.editDialog({
      id: record._id,
      title: "edit dialog",
      county: record.county,
      town: record.town,
      address: record.address,
      confirmText: 'Edit'
    }).subscribe( ( newCard ) => {  
      console.log(newCard)
      if(newCard.confirmText.toString() == "Edit"){   
        this.dialogService.confirmDialog({
          message: "Are you sure you want to edit this?", 
          confirmText: 'Yes',
          cancelText: 'No'
        }).subscribe( ( result ) => {  
          if(result.toString() == "true"){   
            console.log("record edited");
            let body = {
              "county": newCard.county,
              "town": newCard.town,
              "address": newCard.address,
            }

            this.http.put(`http://localhost:3001/api/locations/${record._id}`, body)
            .subscribe((res) => {
              console.log(res)
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

  

  openCreateDialog(){
  
    this.dialogService.createDialog({
      title: "create dialog",
      county: "",
      town: "",
      address: "",
      confirmText: 'Create'
    }).subscribe( ( newCard ) => {  
      console.log(newCard)
      if(newCard.confirmText.toString() == "Create"){   
        let body = {
          "county": newCard.county,
          "town": newCard.town,
          "address": newCard.address,
        }

        this.http.post(`http://localhost:3001/api/locations`, body)
        .subscribe((res) =>{
          console.log(res)
        })

      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }
}
