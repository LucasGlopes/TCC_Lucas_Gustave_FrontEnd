import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsHomeComponent } from './exams-home/exams-home.component';
import { ExamsHistoryComponent } from './exams-history/exams-history.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { ExamsDetailsComponent } from './exams-details/exams-details.component';

import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    ExamsHomeComponent,
    ExamsHistoryComponent,
    ExamsListComponent,
    ExamsDetailsComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ExamsModule { }
