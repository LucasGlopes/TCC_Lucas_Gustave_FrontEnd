import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsSchedulingComponent } from './exams-scheduling.component';

describe('ExamsSchedulingComponent', () => {
  let component: ExamsSchedulingComponent;
  let fixture: ComponentFixture<ExamsSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsSchedulingComponent]
    });
    fixture = TestBed.createComponent(ExamsSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
