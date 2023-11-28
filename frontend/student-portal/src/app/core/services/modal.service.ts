import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal-component/modal-component.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialogRef: MatDialogRef<any> | null = null;
  constructor(public dialog: MatDialog) {}

  openDialog(data: any) {
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data,
    });
  }

  closeDialog() {
    this.dialogRef?.close();
  }
}
