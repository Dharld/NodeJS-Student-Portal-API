import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError, tap, map } from 'rxjs';
import { LoadingService } from './loading.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiSuffix = 'api/v1/classes';

  private classes = new BehaviorSubject<any[]>([]);
  public classes$ = this.classes.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {}

  addClass(
    courseId: string,
    room: string,
    day: string,
    hour: number,
    minute: number
  ) {
    let httpParams = new HttpParams({
      fromObject: {
        courseId: courseId,
      },
    });

    this.loadingService.load();

    const date = `${day}T${hour}:${minute}+01:00`;

    return this.http
      .post(
        this.apiSuffix,
        { room, time: date },
        {
          params: httpParams,
        }
      )
      .pipe(
        catchError((err) => {
          console.error('Error: ', err);
          return throwError(err);
        }),
        map((res: any) => {
          if (res.success) {
            return res.data;
          }
        }),
        tap(() => {
          this.getClasses(courseId).subscribe(() => {
            window.history.back();
            this.loadingService.stop();
          });
        })
      );
  }

  getClasses(courseId: string) {
    const httpParams = new HttpParams({
      fromObject: {
        courseId: courseId,
      },
    });

    return this.http
      .get(this.apiSuffix, {
        params: httpParams,
      })
      .pipe(
        catchError((err) => {
          console.error('Error: ', err);
          return throwError(err);
        }),
        map((res: any) => {
          if (res.success) {
            this.classes.next(res.data);
            return res.data;
          }
        }),
        tap(() => {
          this.snackbarService
            .openSnackBar('The classes has been successfully retrieved !', 'OK')
            .subscribe();
        })
      );
  }
}
