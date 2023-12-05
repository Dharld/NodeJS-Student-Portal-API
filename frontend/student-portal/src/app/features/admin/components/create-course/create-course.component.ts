import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';
import { catchError, throwError } from 'rxjs';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {
  errorMessage = '';

  currentUser = this.authService.getCurrentUser();

  teachers$ = this.usersService.teachers;

  createCourseForm = this.fb.group({
    name: [''],
    description: [''],
    code: [''],
    status: [''],
    teacherId: [''],
  });

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private courseService: CourseService,
    private usersService: UserService
  ) {
    this.usersService.getTeachers(this.currentUser?.USER_ID!).subscribe();
  }

  submitForm() {
    const createCourseForm = this.createCourseForm.value;
    const courseInf = {
      name: createCourseForm['name'],
      description: createCourseForm['description'],
      code: createCourseForm['code'],
      status: createCourseForm['status'],
      teacher_id: createCourseForm['teacherId'],
    };

    const adminId = this.currentUser?.USER_ID;

    this.courseService
      .createCourse(courseInf, adminId!)
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
