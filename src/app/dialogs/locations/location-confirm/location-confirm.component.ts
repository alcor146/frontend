import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/models/locations/confirm-dialog-data';

@Component({
  selector: 'app-location-confirm',
  templateUrl: './location-confirm.component.html',
  styleUrls: ['./location-confirm.component.css']
})
export class LocationConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }

  ngOnInit(): void {
  }

}
