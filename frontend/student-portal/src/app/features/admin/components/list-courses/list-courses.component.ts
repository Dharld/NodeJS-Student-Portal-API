import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss'],
})
export class ListCoursesComponent {
  loading$!: Observable<boolean> | null;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'code',
    'status',
    'customColumn',
  ];

  currentUser = this.auth.getCurrentUser();
  adminId = this.currentUser?.USER_ID;

  courses$ = this.courseService.courses$;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private courseService: CourseService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.courseService.getCourses().subscribe();
    this.courses$.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.loading$ = this.loadingService.loading$;
  }

  createCourse() {
    this.router.navigate(['admin', { outlets: { other: ['createCourse'] } }]);
  }

  deleteCourse(course: any) {
    this.modalService.deleteCourse(course);
  }

  editCourse(course: any) {
    this.router.navigate(['admin', { outlets: { other: 'editCourse' } }], {
      state: course,
    });
  }
}
