import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistrationsComponent } from './list-registrations.component';

describe('ListRegistrationsComponent', () => {
  let component: ListRegistrationsComponent;
  let fixture: ComponentFixture<ListRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
