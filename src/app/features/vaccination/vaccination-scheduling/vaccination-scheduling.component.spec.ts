import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationSchedulingComponent } from './vaccination-scheduling.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

describe('VaccinationSchedulingComponent', () => {
  let component: VaccinationSchedulingComponent;
  let fixture: ComponentFixture<VaccinationSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationSchedulingComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ]
    });
    fixture = TestBed.createComponent(VaccinationSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
