import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PasswordEditDialogData } from 'src/app/models/clients/password-edit-dialog';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasswordEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PasswordEditDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

  ngOnInit(): void {
  }

}
