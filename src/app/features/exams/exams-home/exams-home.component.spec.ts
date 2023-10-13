import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsHomeComponent } from './exams-home.component';

describe('ExamsHomeComponent', () => {
  let component: ExamsHomeComponent;
  let fixture: ComponentFixture<ExamsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsHomeComponent]
    });
    fixture = TestBed.createComponent(ExamsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
