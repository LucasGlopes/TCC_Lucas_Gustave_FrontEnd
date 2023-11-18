import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationStatusDialogComponent } from './status-dialog.component';

describe('StatusDialogComponent', () => {
  let component: VaccinationStatusDialogComponent;
  let fixture: ComponentFixture<VaccinationStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationStatusDialogComponent]
    });
    fixture = TestBed.createComponent(VaccinationStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
