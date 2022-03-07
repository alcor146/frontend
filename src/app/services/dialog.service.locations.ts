import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LocationConfirmComponent } from 'src/app/dialogs/locations/location-confirm/location-confirm.component';
import { ConfirmDialogData } from 'src/app/models/locations/confirm-dialog-data';
import { LocationEditComponent } from 'src/app/dialogs/locations/location-edit/location-edit.component';
import { EditDialogData } from 'src/app/models/locations/edit-dialog-data';
import { LocationCreateComponent } from 'src/app/dialogs/locations/location-create/location-create.component';
import { CreateDialogData } from 'src/app/models/locations/create-dialog-data';


@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    const popUp = this.dialog
    .open(LocationConfirmComponent, {
      data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  editDialog(data: EditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(LocationEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  createDialog(data: CreateDialogData): Observable<any>{
    const popUp = this.dialog
    .open(LocationCreateComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  

}

