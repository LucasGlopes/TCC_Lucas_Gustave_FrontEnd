import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsHistoryComponent } from './exams-history.component';

describe('ExamsHistoryComponent', () => {
  let component: ExamsHistoryComponent;
  let fixture: ComponentFixture<ExamsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsHistoryComponent]
    });
    fixture = TestBed.createComponent(ExamsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
