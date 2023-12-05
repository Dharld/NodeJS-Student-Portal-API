import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeEvaluationComponent } from './grade-evaluation.component';

describe('GradeEvaluationComponent', () => {
  let component: GradeEvaluationComponent;
  let fixture: ComponentFixture<GradeEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
