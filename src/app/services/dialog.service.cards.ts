import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CardConfirmComponent } from 'src/app/dialogs/cards/card-confirm/card-confirm.component';
import { ConfirmDialogData } from 'src/app/models/cards/confirm-dialog-data';
import { CardEditComponent } from 'src/app/dialogs/cards/card-edit/card-edit.component';
import { EditDialogData } from 'src/app/models/cards/edit-dialog-data';
import { CardCreateComponent } from 'src/app/dialogs/cards/card-create/card-create.component';
import { CreateDialogData } from 'src/app/models/cards/create-dialog-data';


@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    const popUp = this.dialog
    .open(CardConfirmComponent, {
      data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  editDialog(data: EditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(CardEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  createDialog(data: CreateDialogData): Observable<any>{
    const popUp = this.dialog
    .open(CardCreateComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  

}

