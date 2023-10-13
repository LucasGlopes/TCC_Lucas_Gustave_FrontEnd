import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsHomeComponent } from './exams-home/exams-home.component';
import { ExamsHistoryComponent } from './exams-history/exams-history.component';
import { ExamsSchedulingComponent } from './exams-scheduling/exams-scheduling.component';
import { ExamsDetailsComponent } from './exams-details/exams-details.component';


@NgModule({
  declarations: [
    ExamsHomeComponent,
    ExamsHistoryComponent,
    ExamsSchedulingComponent,
    ExamsDetailsComponent
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    MatButtonModule
  ]
})
export class ExamsModule { }
