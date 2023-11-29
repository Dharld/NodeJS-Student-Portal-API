import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal-component/modal-component.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

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

  deleteCourse(course: any) {
    this.dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: course,
    });
  }
  closeDialog() {
    this.dialogRef?.close();
  }
}
