import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsDetailsComponent } from './exams-details.component';

describe('ExamsDetailsComponent', () => {
  let component: ExamsDetailsComponent;
  let fixture: ComponentFixture<ExamsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsDetailsComponent]
    });
    fixture = TestBed.createComponent(ExamsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
