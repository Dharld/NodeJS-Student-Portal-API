import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { CourseService } from 'src/app/core/services/course.service';
import { RegistrationService } from 'src/app/core/services/registration.service';

@Component({
  selector: 'app-list-registrations',
  templateUrl: './list-registrations.component.html',
  styleUrls: ['./list-registrations.component.scss'],
})
export class ListRegistrationsComponent {
  loading$!: Observable<boolean> | null;
  displayedColumns: string[] = [
    'studentName',
    'courseName',
    'status',
    'customColumn',
  ];

  currentUser = this.auth.getCurrentUser();
  adminId = this.currentUser?.USER_ID;

  registrations$ = this.registrationsService.registrations$;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private loadingService: LoadingService,
    private auth: AuthService,
    private registrationsService: RegistrationService
  ) {
    this.registrationsService
      .getAllRecords(this.adminId)
      .subscribe((data) => console.log(data));
    this.registrations$.subscribe((data: any) => {
      this.dataSource.data = data;
    });
    this.loading$ = this.loadingService.loading$;
  }

  validate(
    studentId: string,
    courseId: string,
    decision: 'ACCEPTED' | 'REJECTED'
  ) {
    this.registrationsService
      .updateRecord(studentId, courseId, this.adminId, decision)
      .subscribe();
  }
}
