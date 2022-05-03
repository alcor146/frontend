import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/models/clients/edit-dialog-data';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfileEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EditDialogData) {}

    onclose(){
      this.data.confirmText = "close";
    }

  ngOnInit(): void {
  }

}
