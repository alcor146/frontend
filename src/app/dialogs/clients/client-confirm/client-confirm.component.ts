import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/models/clients/confirm-dialog-data';
@Component({
  selector: 'app-client-confirm',
  templateUrl: './client-confirm.component.html',
  styleUrls: ['./client-confirm.component.css']
})
export class ClientConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }


  ngOnInit(): void {
  }

}
