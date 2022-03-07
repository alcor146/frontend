import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogData } from 'src/app/models/clients/create-dialog-data'

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CreateDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

    ngOnInit(): void {
    }
}
