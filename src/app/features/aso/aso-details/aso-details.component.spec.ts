import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoDetailsComponent } from './aso-details.component';

describe('AsoDetailsComponent', () => {
  let component: AsoDetailsComponent;
  let fixture: ComponentFixture<AsoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoDetailsComponent]
    });
    fixture = TestBed.createComponent(AsoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
