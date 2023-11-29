import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  ref = this.modalService.dialogRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    private authService: AuthService,
    private courseService: CourseService
  ) {
    console.log(data);
  }

  choose(decision: boolean) {
    if (decision) {
      const adminId = this.authService.getCurrentUser()?.USER_ID;
      this.courseService.deleteCourse(this.data, adminId!).subscribe();
    }
    this.modalService.closeDialog();
  }
}
