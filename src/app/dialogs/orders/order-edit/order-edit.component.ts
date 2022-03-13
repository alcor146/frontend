import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/models/orders/edit-dialog-data';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EditDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

  ngOnInit(): void {
  }

}
