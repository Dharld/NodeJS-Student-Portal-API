import { Component } from '@angular/core';
import { Observable, forkJoin, from, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  currentStudent: any = this.authService.getCurrentUser();
  courses$: Observable<any> = this.coursesService.courses$;
  courses: any[] = [];

  constructor(
    private coursesService: CourseService,
    private userService: UserService,
    private registerService: RegistrationService,
    private authService: AuthService
  ) {
    this.coursesService.getCourses().subscribe((courses) => {
      forkJoin(
        courses.map((c: any) => {
          return this.userService.getUser(c.teacher.USER_ID).pipe(
            map((user) => {
              return {
                ...user,
                ...c,
              };
            })
          );
        })
      ).subscribe((data: any) => {
        this.courses = data;
      });
    });
  }

  register(courseId: string) {
    const studentId = this.currentStudent?.STU_ID;
    this.registerService.register(studentId, courseId).subscribe();
  }
}
