import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClassService } from 'src/app/core/services/class.service';
import { EvaluationService } from 'src/app/core/services/evaluation.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
})
export class EvaluationsComponent {
  courseId!: string;
  loading$!: Observable<boolean> | null;
  displayedColumns: string[] = [
    'ID',
    'Type',
    'Name',
    'Percentage',
    /* 'customColumn', */
  ];

  currentUser = this.auth.getCurrentUser();
  adminId = this.currentUser?.USER_ID;

  evals$ = this.evaluationService.evals$;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService
  ) {
    this.route.params.subscribe((data) => {
      this.courseId = data['courseId'];
      this.evaluationService.getAllEvaluations(this.courseId).subscribe();
    });
    this.evals$.subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
    });

    this.loading$ = this.loadingService.loading$;
  }

  createEvaluation() {
    this.router.navigate(['createEvaluation'], {
      relativeTo: this.route,
      state: {
        courseId: this.courseId,
      },
    });
  }

  show(row: any) {
    this.router.navigate([row.CLASS_ID], {
      relativeTo: this.route,
      state: {
        courseId: this.courseId,
        eval: row,
      },
    });
  }
}
