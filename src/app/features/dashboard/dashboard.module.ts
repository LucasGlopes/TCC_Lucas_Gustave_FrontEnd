import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'angular-highcharts';


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
    ChartModule
  ]
})
export class DashboardModule { }
