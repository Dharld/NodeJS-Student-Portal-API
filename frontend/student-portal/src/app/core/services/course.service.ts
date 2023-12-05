import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { User } from '../models/user.model';
import {
  BehaviorSubject,
  tap,
  catchError,
  throwError,
  finalize,
  map,
} from 'rxjs';
import { LoadingService } from './loading.service';
import { SnackbarService } from './snackbar.service';
import { NavigationService } from './navigation.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiSuffix = 'api/v1/courses';

  private courses = new BehaviorSubject<Course[]>([]);
  public courses$ = this.courses.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private snackService: SnackbarService,
    private navigation: NavigationService,

    private router: Router
  ) {}

  setCourses(courses: Course[]) {
    this.courses.next(courses);
  }

  getCourses(status?: boolean, teacherId?: string) {
    let httpParams = new HttpParams();

    if (status) {
      httpParams = httpParams.append('status', 'AVAILABLE');
    }

    if (teacherId) {
      httpParams = httpParams.append('teacherId', teacherId);
    }

    const finalUrl = this.apiSuffix;

    this.loadingService.load();

    return this.http.get<Course[]>(finalUrl, { params: httpParams }).pipe(
      catchError((err) => {
        console.error('Error: ', err);
        return throwError(err);
      }),
      tap((res: any) => {
        const courses = res.data;

        if (res.success) {
          this.setCourses(courses);
          console.log('Courses retrieved succesfully !!!');
          this.loadingService.stop();
        }
      }),
      map((res) => {
        return res.data;
      }),
      finalize(() => {
        this.loadingService.stop();
      })
    );
  }

  createCourse(course: any, adminId: string) {
    const httpParams = new HttpParams({
      fromObject: {
        adminId,
      },
    });
    const finalUrl = this.apiSuffix;

    this.loadingService.load();

    const createCourse$ = this.http.post<any>(finalUrl, course, {
      params: httpParams,
    });

    return createCourse$.pipe(
      catchError((err) => {
        this.loadingService.stop();
        return throwError(err);
      }),
      finalize(() => {
        this.snackService
          .openSnackBar(
            `The ${course.name} course has been created successfully`,
            'OK'
          )
          .subscribe(() => {
            this.getCourses().subscribe(() => {
              window.history.back();
            });
          });

        this.loadingService.stop();
      })
    );
  }

  deleteCourse(course: any, adminId: string) {
    const httpParams = new HttpParams({
      fromObject: {
        adminId,
      },
    });
    const finalUrl = `${this.apiSuffix}/${course.COURSE_ID}`;

    this.loadingService.load();

    const deleteUser$ = this.http.delete<any>(finalUrl, {
      params: httpParams,
    });

    return deleteUser$.pipe(
      catchError((err) => {
        this.loadingService.stop();
        return throwError(err);
      }),
      finalize(() => {
        this.loadingService.stop();
        this.snackService
          .openSnackBar(
            `${course.COURSE_NAME} has been deleted successfully.`,
            'OK'
          )
          .subscribe(() => {
            this.getCourses().subscribe(() => {
              this.navigation.navigateTo(['admin', 'courses']);
            });
          });
      })
    );
  }

  goBackToMainRouter() {
    this.router.navigate([{ outlets: { other: null } }]);
  }

  editCourse(course: any, adminId: string) {
    const httpParams = new HttpParams({
      fromObject: {
        adminId,
      },
    });
    const finalUrl = `${this.apiSuffix}/${course.COURSE_ID}`;

    this.loadingService.load();

    const editcourse$ = this.http.put<any>(finalUrl, course, {
      params: httpParams,
    });

    return editcourse$.pipe(
      catchError((err) => {
        this.loadingService.stop();
        return throwError(err);
      }),
      finalize(() => {
        this.loadingService.stop();
        this.snackService
          .openSnackBar(
            `${course.COURSE_NAME} has been updated successfully.`,
            'OK'
          )
          .subscribe(() => {
            this.getCourses().subscribe(() => {
              window.history.back();
            });
          });
      })
    );
  }
}
