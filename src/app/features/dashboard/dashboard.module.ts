import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'angular-highcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';


@NgModule({
  declarations: [
    DashboardChartsComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    ChartModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class DashboardModule { }
