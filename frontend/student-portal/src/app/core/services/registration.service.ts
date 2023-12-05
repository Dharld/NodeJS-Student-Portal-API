import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { SnackbarService } from './snackbar.service';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  tap,
  throwError,
  forkJoin,
} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiSuffix = 'api/v1/registers';

  private registrations = new BehaviorSubject<any[]>([]);
  public registrations$ = this.registrations.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private snackService: SnackbarService
  ) {}

  register(studentId: string, courseId: string) {
    const finalUrl = `${this.apiSuffix}/${studentId}`;

    this.loadingService.load();

    return this.http
      .post(finalUrl, {
        courseId,
      })
      .pipe(
        catchError((err) => {
          console.error('Error: ', err);
          return throwError(err);
        }),
        tap(() => {
          this.snackService.openSnackBar(
            'Your request has been sent for validation.',
            'OK'
          );
          this.loadingService.stop();
        })
      );
  }

  getAllRecords(adminId: string) {
    const finalUrl = `${this.apiSuffix}`;

    const httpParams = new HttpParams({
      fromObject: {
        adminId: adminId,
      },
    });

    this.loadingService.load();

    return this.http.get(finalUrl, { params: httpParams }).pipe(
      catchError((err) => {
        this.loadingService.stop();
        return throwError(err);
      }),
      map((res: any) => {
        if (res.success) {
          this.registrations.next(res.data);
          return res.data;
        }
      }),
      tap(() => {
        this.loadingService.stop();
      })
    );
  }

  getOnlyRegisteredRecords(courseId: string) {
    const finalUrl = `${this.apiSuffix}/only-registered`;

    const httpParams = new HttpParams({
      fromObject: {
        courseId: courseId,
      },
    });

    this.loadingService.load();

    return this.http.get(finalUrl, { params: httpParams }).pipe(
      catchError((err) => {
        this.loadingService.stop();
        return throwError(err);
      }),
      map((res: any) => {
        if (res.success) {
          this.registrations.next(res.data);
          return res.data;
        }
      }),
      tap(() => {
        this.loadingService.stop();
      })
    );
  }

  updateRecord(
    studentId: string,
    courseId: string,
    adminId: string,
    status: 'ACCEPTED' | 'REJECTED'
  ) {
    const finalUrl = `${this.apiSuffix}/${studentId}/${courseId}`;

    const httpParams = new HttpParams({
      fromObject: {
        adminId,
      },
    });

    this.loadingService.load();

    return this.http
      .put(
        finalUrl,
        { regStatus: status },
        {
          params: httpParams,
        }
      )
      .pipe(
        catchError((err) => {
          this.loadingService.stop();
          return throwError(err);
        }),
        tap(() => {
          this.getAllRecords(adminId).subscribe(() => {
            this.snackService
              .openSnackBar(
                'Your modification has been successfully applied',
                'OK'
              )
              .subscribe();
          });

          this.loadingService.stop();
        })
      );
  }
}
