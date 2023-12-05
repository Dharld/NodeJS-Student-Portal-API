import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, finalize, map } from 'rxjs';
import { LoadingService } from './loading.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiSuffix = 'api/v1/attends';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {}

  updateAttendanceRecord(
    studentId: string,
    classId: string,
    status: 'PRESENT' | 'ABSENT'
  ) {
    const finalUrl = this.apiSuffix;

    const httpParams = new HttpParams({
      fromObject: {
        studentId: studentId,
        classId: classId,
      },
    });

    this.loadingService.load();

    return this.http
      .put(
        finalUrl,
        {
          attendStatus: status,
        },
        { params: httpParams }
      )
      .pipe(
        catchError((err) => {
          console.error('Error: ', err);
          return throwError(err);
        }),
        finalize(() => {
          this.loadingService.stop();
        })
      );
  }

  getAllRecords(classId: string) {
    const finalUrl = this.apiSuffix + '/get-all-by-class';

    const httpParams = new HttpParams({
      fromObject: {
        classId,
      },
    });

    this.loadingService.load();

    return this.http.get(finalUrl, { params: httpParams }).pipe(
      catchError((err) => {
        console.error('Error: ', err);
        return throwError(err);
      }),
      map((res: any) => res.data),
      finalize(() => {
        this.loadingService.stop();
      })
    );
  }
}
