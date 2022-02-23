import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogData } from 'src/app/models/cards/create-dialog-data'

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CreateDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

  ngOnInit(): void {
  }
}
