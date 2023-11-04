import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoHistoryComponent } from './aso-history.component';

describe('AsoHistoryComponent', () => {
  let component: AsoHistoryComponent;
  let fixture: ComponentFixture<AsoHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoHistoryComponent]
    });
    fixture = TestBed.createComponent(AsoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
