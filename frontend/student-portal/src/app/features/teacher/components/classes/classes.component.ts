import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { ClassService } from 'src/app/core/services/class.service';
import { CourseService } from 'src/app/core/services/course.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { getHoursAndMinutes, getWeekDay } from 'src/app/core/utils/moment';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  courseId!: string;
  loading$!: Observable<boolean> | null;
  displayedColumns: string[] = [
    'ID',
    'Room',
    'WeekDay',
    'Time',
    'customColumn',
  ];

  currentUser = this.auth.getCurrentUser();
  adminId = this.currentUser?.USER_ID;

  classes$ = this.classesService.classes$;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private auth: AuthService,
    private classesService: ClassService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private router: Router
  ) {
    this.route.params.subscribe((data) => {
      this.courseId = data['courseId'];
      this.classesService
        .getClasses(this.courseId)
        .pipe(
          map((classes) => {
            return classes.map((c: any) => {
              const date = new Date(c.CLASS_TIME);
              return {
                ...c,
                CLASS_DAY: getWeekDay(c.CLASS_TIME),
                CLASS_TIME2: getHoursAndMinutes(c.CLASS_TIME),
              };
            });
          })
        )
        .subscribe();
    });
    this.classes$
      .pipe(
        map((classes) => {
          return classes.map((c: any) => {
            return {
              ...c,
              CLASS_DAY: getWeekDay(c.CLASS_TIME),
              CLASS_TIME2: getHoursAndMinutes(c.CLASS_TIME),
            };
          });
        })
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
    this.loading$ = this.loadingService.loading$;
  }

  createClass() {
    this.router.navigate(['createClass'], {
      relativeTo: this.route,
      state: {
        courseId: this.courseId,
      },
    });
  }

  show(row: any) {
    this.router.navigate([row.CLASS_ID], {
      relativeTo: this.route,
      state: {
        courseId: this.courseId,
        class: row,
      },
    });
  }
}
