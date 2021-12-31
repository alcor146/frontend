import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service';

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
    this.showOrders();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showOrders();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showOrders();
  }

  showOrders(){

      this.records = [
        {
          id: 1,
          name: 'profilename1',
          value: 'profilevalue1',
          description: 'profiledescription1'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        },
        {
          id: 2,
          name: 'profilename2',
          value: 'profilevalue2',
          description: 'profiledescription2'
        },
        {
          id: 3,
          name: 'profilename3',
          value: 'profilevalue3',
          description: 'profiledescription3'
        },
        {
          id: 4,
          name: 'profilename4',
          value: 'profilevalue4',
          description: 'profiledescription4'
        }
      ];
  }

  openDeleteDialog(record: string){
    
    this.dialogService.confirmDialog({
   
      message: "Are you sure you want to delete this?", 
      confirmText: 'Yes',
      cancelText: 'No'
    }).subscribe( ( result ) => {  
      if(result.toString() == "true"){   
        console.log(result);
        console.log(typeof result);
        console.log("record deleted");
        //this.delete_record(record.name);
      } else {
        console.log(result);
        console.log(typeof result);
        console.log("NUUUUUUUUU");
      }
    });

  }

  openEditDialog(record: any){
    
    this.dialogService.editDialog({
      id: record.id,
      title: "edit dialog",
      name: record.name,
      value: record.value,
      description: record.description,
      confirmText: 'Edit'
    }).subscribe( ( result ) => {  
      console.log(result)
      if(result.confirmText.toString() == "Edit"){   
        this.dialogService.confirmDialog({
          message: "Are you sure you want to edit this?", 
          confirmText: 'Yes',
          cancelText: 'No'
        }).subscribe( ( result ) => {  
          if(result.toString() == "true"){   
            console.log("record edited");
            //this.edit_record(record.id);
          } else {
            console.log(result);
            console.log(typeof result);
            console.log("NUUUUUUUUU edit");
          }
        });


      } else {
        console.log(result);
        console.log(typeof result);
        console.log("NUUUUUUUUU");
      }
    });

  }

  openPreviewDialog(record: any){
  
    this.dialogService.previewDialog({
      title: "preview dialog",
      name: record.name,
      value: record.value,
      description: record.description,
    }).subscribe( ( result ) => {  
      if(result.toString() == "false")   
        console.log("dialog closed");
    });
  }

  openCreateDialog(){
  
    this.dialogService.createDialog({
      title: "create profile dialog",
      name: "",
      value: "",
      description: "",
      confirmText: 'Create'
    }).subscribe( ( result ) => {  
      console.log(result)
      if(result.confirmText.toString() == "Create"){   
        //api create
      } else {
        console.log(result);
        console.log(typeof result);
        console.log("NUUUUUUUUU");
      }
    });
  }
}
