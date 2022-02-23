import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/dialogs/products/confirm/confirm.component';
import { ConfirmDialogData } from 'src/app/models/products/confirm-dialog-data';
import { EditComponent } from 'src/app/dialogs/products/edit/edit.component';
import { EditDialogData } from 'src/app/models/products/edit-dialog-data';
import { PreviewComponent } from 'src/app/dialogs/products/preview/preview.component';
import { PreviewDialogData } from 'src/app/models/products/preview-dialog-data';
import { CreateComponent } from 'src/app/dialogs/products/create/create.component';
import { CreateDialogData } from 'src/app/models/products/create-dialog-data';


@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    const popUp = this.dialog
    .open(ConfirmComponent, {
      data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  editDialog(data: EditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(EditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  previewDialog(data: PreviewDialogData): Observable<any>{
    const popUp = this.dialog
    .open(PreviewComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  createDialog(data: CreateDialogData): Observable<any>{
    const popUp = this.dialog
    .open(CreateComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  

}

