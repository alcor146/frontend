import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.locations';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  records: any = [];
  filterTerm: string = "";
  page: any;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : Array<number> = [3, 6, 9, 12]
  role: string = ""
  user: string = ""

  constructor(private http: HttpClient, private dialogService: DialogService, private rbacService: RBACService, private authService: AuthService) { 
    
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
   
      if(data.status == "200"){
        this.user = data.token.userId
        this.role = data.token.role
        this.showLocations();
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
  }

  ngOnInit(): void {
    this.getRoles()
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
      if(this.role == "basic"){
        this.http.post('http://localhost:3001/api/locations/user', {createdBy: this.user})
        .subscribe((res) => {
          let jsonString = JSON.stringify(res);
          let jsonDB = JSON.parse(jsonString);
          console.log(jsonDB);
          this.records = jsonDB.data;
        })
      }else if(this.role == "admin"){
        this.http.get('http://localhost:3001/api/locations')
        .subscribe((res) => {
          let jsonString = JSON.stringify(res);
          let jsonDB = JSON.parse(jsonString);
          console.log(jsonDB);
          this.records = jsonDB.data;
        })
      }
      console.log(this.role)
      
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
          this.showLocations();
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
    }).subscribe( ( newLocation ) => {  
      console.log(newLocation)
      if(newLocation.confirmText.toString() == "Edit"){   
        this.dialogService.confirmDialog({
          message: "Are you sure you want to edit this?", 
          confirmText: 'Yes',
          cancelText: 'No'
        }).subscribe( ( result ) => {  
          if(result.toString() == "true"){   
            console.log("record edited");
            let body = {
              "county": newLocation.county,
              "town": newLocation.town,
              "address": newLocation.address,
            }

            this.http.put(`http://localhost:3001/api/locations/${record._id}`, body)
            .subscribe((res) => {
              console.log(res)
              this.showLocations();
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
    }).subscribe( ( newLocation ) => {  
      console.log(newLocation)
      if(newLocation.confirmText.toString() == "Create"){   
        let body = {
          "createdBy": this.user,
          "county": newLocation.county,
          "town": newLocation.town,
          "address": newLocation.address,
        }

        this.http.post(`http://localhost:3001/api/locations`, body)
        .subscribe((res) =>{
          console.log(res)
          this.showLocations();
        })

      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }
}
