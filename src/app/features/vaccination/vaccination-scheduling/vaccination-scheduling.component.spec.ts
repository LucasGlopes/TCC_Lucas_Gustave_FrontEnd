import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationSchedulingComponent } from './vaccination-scheduling.component';

describe('VaccinationSchedulingComponent', () => {
  let component: VaccinationSchedulingComponent;
  let fixture: ComponentFixture<VaccinationSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationSchedulingComponent]
    });
    fixture = TestBed.createComponent(VaccinationSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
