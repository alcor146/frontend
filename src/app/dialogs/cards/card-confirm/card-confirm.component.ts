import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/models/cards/confirm-dialog-data';

@Component({
  selector: 'app-card-confirm',
  templateUrl: './card-confirm.component.html',
  styleUrls: ['./card-confirm.component.css']
})

export class CardConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }

  ngOnInit(): void {
  }


}
