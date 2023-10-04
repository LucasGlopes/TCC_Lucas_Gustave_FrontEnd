import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationHomeComponent } from './vaccination-home.component';

describe('VaccinationHomeComponent', () => {
  let component: VaccinationHomeComponent;
  let fixture: ComponentFixture<VaccinationHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationHomeComponent]
    });
    fixture = TestBed.createComponent(VaccinationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
