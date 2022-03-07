import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderConfirmComponent } from 'src/app/dialogs/orders/order-confirm/order-confirm.component';
import { ConfirmDialogData } from 'src/app/models/orders/confirm-dialog-data';
import { OrderEditComponent } from 'src/app/dialogs/orders/order-edit/order-edit.component';
import { EditDialogData } from 'src/app/models/orders/edit-dialog-data';
import { OrderPreviewComponent } from 'src/app/dialogs/orders/order-preview/order-preview.component';
import { PreviewDialogData } from 'src/app/models/orders/preview-dialog-data';
import { OrderCreateComponent } from 'src/app/dialogs/orders/order-create/order-create.component';
import { CreateDialogData } from 'src/app/models/orders/create-dialog-data';


@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    const popUp = this.dialog
    .open(OrderConfirmComponent, {
      data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  editDialog(data: EditDialogData): Observable<any>{
    const popUp = this.dialog
    .open(OrderEditComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  previewDialog(data: PreviewDialogData): Observable<any>{
    const popUp = this.dialog
    .open(OrderPreviewComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  createDialog(data: CreateDialogData): Observable<any>{
    const popUp = this.dialog
    .open(OrderCreateComponent, {
      data: data,
      width: '400px',
      disableClose: true,
    });

    return popUp.afterClosed();
  }

  

}

