import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClientConfirmComponent } from 'src/app/dialogs/clients/client-confirm/client-confirm.component';
import { ConfirmDialogData } from 'src/app/models/clients/confirm-dialog-data';
import { ClientEditComponent } from 'src/app/dialogs/clients/client-edit/client-edit.component';
import { EditDialogData } from 'src/app/models/clients/edit-dialog-data';
import { ClientCreateComponent } from 'src/app/dialogs/clients/client-create/client-create.component';
import { CreateDialogData } from 'src/app/models/clients/create-dialog-data';
import { ProfileEditComponent } from '../dialogs/clients/profile-edit/profile-edit.component';
import { ProfileEditDialogData } from '../models/clients/profile-edit-dialog';
import { PasswordEditComponent } from '../dialogs/clients/password-edit/password-edit.component';
import { PasswordEditDialogData } from '../models/clients/password-edit-dialog';

@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    const popUp = this.dialog
    .open(ClientConfirmComponent, {
      data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  editDialog(data: EditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(ClientEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  profileEditDialog(data: ProfileEditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(ProfileEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  passwordEditDialog(data: PasswordEditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(PasswordEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  createDialog(data: CreateDialogData): Observable<any>{
    const popUp = this.dialog
    .open(ClientCreateComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  

}

