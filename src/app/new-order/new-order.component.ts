import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  constructor(private http: HttpClient, private dialogService: DialogService)  {
  }

  ngOnInit(): void {
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
