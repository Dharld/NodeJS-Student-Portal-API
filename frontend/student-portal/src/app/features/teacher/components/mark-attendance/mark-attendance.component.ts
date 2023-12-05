import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss'],
})
export class MarkAttendanceComponent {
  errorMessage = '';
  state = this.router.getCurrentNavigation()?.extras.state;
  courseId?: string = this.state && this.state['courseId'];
  class: any = this.state && this.state['class'];
  displayedColumns: string[] = ['select', 'StudentName', 'Attendance'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  students: any[] = [];

  currentUser = this.authService.getCurrentUser();
  loading$ = this.loadingService.loading$;

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.getAllRegisteredStudents().subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  getAllRegisteredStudents() {
    const classId = this.class.CLASS_ID;
    return this.attendanceService.getAllRecords(classId);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  getNonSelectedRows() {
    return this.dataSource.data.filter(
      (row) => !this.selection.isSelected(row)
    );
  }

  markAsPresent() {
    if (this.selection.selected.length === 0) {
      forkJoin(
        this.getNonSelectedRows().map((r) => {
          return this.attendanceService.updateAttendanceRecord(
            r.STU_ID,
            this.class.CLASS_ID,
            'ABSENT'
          );
        })
      ).subscribe(() => {
        this.goBack();
      });
    } else {
      forkJoin(
        this.selection.selected.map((r) => {
          return this.attendanceService.updateAttendanceRecord(
            r.STU_ID,
            this.class.CLASS_ID,
            'PRESENT'
          );
        })
      ).subscribe(() => {
        forkJoin(
          this.getNonSelectedRows().map((r) => {
            return this.attendanceService.updateAttendanceRecord(
              r.STU_ID,
              this.class.CLASS_ID,
              'ABSENT'
            );
          })
        ).subscribe(() => {
          this.goBack();
        });
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
