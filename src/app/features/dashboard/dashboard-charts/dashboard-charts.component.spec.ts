import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartsComponent } from './dashboard-charts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChartModule } from 'angular-highcharts';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardChartsComponent', () => {
  let component: DashboardChartsComponent;
  let fixture: ComponentFixture<DashboardChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardChartsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ChartModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(DashboardChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
