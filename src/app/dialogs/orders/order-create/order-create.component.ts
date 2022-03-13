import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogData } from 'src/app/models/orders/create-dialog-data'

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CreateDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

  ngOnInit(): void {
  }

}
