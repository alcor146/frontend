import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreviewDialogData } from 'src/app/models/products/preview-dialog-data';




@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PreviewDialogData) {
  }


  ngOnInit(): void {
  }

  

}
