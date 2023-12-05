import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClassService } from 'src/app/core/services/class.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent {
  errorMessage = '';
  state = this.router.getCurrentNavigation()?.extras.state;
  courseId?: string = this.state && this.state['courseId'];

  currentUser = this.authService.getCurrentUser();

  createClassForm = this.fb.group({
    room: [''],
    day: [''],
    hour: [''],
    minute: [''],
  });

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private classService: ClassService,
    private router: Router
  ) {}

  submitForm() {
    const createClassForm = this.createClassForm.value;
    const adminId = this.currentUser?.USER_ID;

    const { room, day, hour, minute } = createClassForm;

    this.classService
      .addClass(this.courseId!, room!, day!, +hour!, +minute!)
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
