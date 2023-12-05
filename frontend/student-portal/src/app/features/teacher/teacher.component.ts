import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  courses$ = this.courseService.courses$;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {
    this.getCourses().subscribe();
  }

  getCourses() {
    return this.courseService.getCourses(true, this.currentUser.TEACHER_ID);
  }
}
