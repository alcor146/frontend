import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  
  records: any = [];
  filterTerm: string = "";
  page: any;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : Array<number> = [3, 6, 9, 12]

  constructor(private http: HttpClient, private dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    this.showClients();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showClients();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showClients();
  }

  showClients(){

      this.http.get('http://localhost:3001/api/clients')
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
        this.http.delete(`http://localhost:3001/api/clients/${record._id}`)
        .subscribe((res) =>{
          console.log(res);
          this.showClients();
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
      email: record.email,
      name: record.name,
      phoneNumber: record.phoneNumber,
      password: record.password,
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
              "email": newClient.email,
              "name": newClient.name,
              "phoneNumber": newClient.phoneNumber,
              "password": newClient.password,
            }

            this.http.put(`http://localhost:3001/api/clients/${record._id}`, body)
            .subscribe((res) => {
              console.log(res)
              this.showClients();
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
      email: "",
      name: "",
      phoneNumber: "",
      password: "",
      confirmText: 'Create'
    }).subscribe( ( newClient ) => {  
      console.log(newClient)
      if(newClient.confirmText.toString() == "Create"){   
        let body = {
          "email": newClient.email,
          "name": newClient.name,
          "phoneNumber": newClient.phoneNumber,
          "password": newClient.password,
        }

        this.http.post(`http://localhost:3001/api/clients`, body)
        .subscribe((res) =>{
          console.log(res)
          this.showClients();
        })

      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }

}
