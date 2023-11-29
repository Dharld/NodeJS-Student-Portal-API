import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent {
  errorMessage = '';

  currentUser = this.authService.getCurrentUser();
  editedCourse: Course | null = null;

  editCourseForm!: FormGroup;

  loading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.editedCourse = navigation?.extras.state as Course;

    this.editCourseForm = this.fb.group({
      name: [this.editedCourse ? this.editedCourse.COURSE_NAME : ''],
      description: [this.editedCourse ? this.editedCourse.COURSE_DESC : ''],
      code: [this.editedCourse ? this.editedCourse.COURSE_CODE : ''],
      status: [this.editedCourse ? this.editedCourse.COURSE_STATUS : ''],
      teacherId: [this.editedCourse ? this.editedCourse.TEACHER_ID : ''],
    });
  }

  submitForm() {
    const editCourseForm = this.editCourseForm.value;

    const courseInf = {
      COURSE_ID: this.editedCourse?.COURSE_ID,
      COURSE_NAME: editCourseForm['name'],
      COURSE_DESC: editCourseForm['description'],
      COURSE_CODE: editCourseForm['code'],
      COURSE_STATUS: editCourseForm['status'],
      TEACHER_ID: editCourseForm['teacherId'],
    };

    const adminId = this.currentUser?.USER_ID;

    this.courseService
      .editCourse(courseInf, adminId!)
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
