import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { ConfirmDialogData } from '../models/confirm-dialog-data';
import { EditComponent } from '../dialogs/edit/edit.component';
import { EditDialogData } from '../models/edit-dialog-data';
import { PreviewComponent } from '../dialogs/preview/preview.component';
import { PreviewDialogData } from '../models/preview-dialog-data';
import { CreateComponent } from '../dialogs/create/create.component';
import { CreateDialogData } from '../models/create-dialog-data';


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

