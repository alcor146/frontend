import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/models/cards/edit-dialog-data';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EditDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }


  ngOnInit(): void {
  }

}
