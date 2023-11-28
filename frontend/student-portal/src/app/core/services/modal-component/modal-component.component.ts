import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../modal.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent {
  ref = this.modalService.dialogRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    private authService: AuthService,
    private usersService: UserService
  ) {}

  choose(decision: boolean) {
    if (decision) {
      const adminId = this.authService.getCurrentUser()?.USER_ID;
      this.usersService.deleteUser(this.data.user, adminId!).subscribe();
    }
    this.modalService.closeDialog();
  }
}
