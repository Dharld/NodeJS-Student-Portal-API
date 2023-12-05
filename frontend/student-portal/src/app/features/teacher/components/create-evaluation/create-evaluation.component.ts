import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EvaluationService } from 'src/app/core/services/evaluation.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss'],
})
export class CreateEvaluationComponent {
  errorMessage = '';
  state = this.router.getCurrentNavigation()?.extras.state;
  courseId?: string = this.state && this.state['courseId'];

  currentUser = this.authService.getCurrentUser();

  createEvaluationForm = this.fb.group({
    type: [''],
    name: [''],
    weight: [''],
  });

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  submitForm() {
    const createEvaluation = this.createEvaluationForm.value;

    const { type, name, weight } = createEvaluation;

    this.evaluationService
      .createEvaluation(type!, name!, +weight!, this.courseId!)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.error.reason;
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.errorMessage = '';
      });
  }

  goBack() {
    window.history.back();
  }
}
