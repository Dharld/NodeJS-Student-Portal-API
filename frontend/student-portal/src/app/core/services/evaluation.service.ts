import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, map, BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private apiSuffix = 'api/v1/evals';

  private evals = new BehaviorSubject<any[]>([]);
  public evals$ = this.evals.asObservable();

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  getAllEvaluations(courseId: string) {
    const finalUrl = this.apiSuffix;

    const httpParams = new HttpParams({
      fromObject: {
        courseId,
      },
    });

    return this.http.get(finalUrl, { params: httpParams }).pipe(
      catchError((err) => {
        console.error('Error: ', err);
        return throwError(err);
      }),
      map((res: any) => res.data),
      tap((evals) => {
        this.evals.next(evals);
      })
    );
  }

  createEvaluation(
    type: string,
    name: string,
    weight: number,
    courseId: string
  ) {
    const finalUrl = this.apiSuffix;

    const httpParams = new HttpParams({
      fromObject: {
        courseId,
      },
    });

    return this.http
      .post(
        finalUrl,
        {
          type,
          name,
          weight,
        },
        {
          params: httpParams,
        }
      )
      .pipe(
        catchError((err) => {
          console.error('Error: ', err);
          return throwError(err);
        }),
        tap((res: any) => {
          if (res.success) {
            this.snackbarService
              .openSnackBar('The evaluation has been created !', 'OK')
              .subscribe(() => {
                this.getAllEvaluations(courseId).subscribe();
              });
          }
        })
      );
  }

  goBack() {
    window.history.back();
  }
}
