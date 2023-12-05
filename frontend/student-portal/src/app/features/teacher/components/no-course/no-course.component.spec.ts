import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCourseComponent } from './no-course.component';

describe('NoCourseComponent', () => {
  let component: NoCourseComponent;
  let fixture: ComponentFixture<NoCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
