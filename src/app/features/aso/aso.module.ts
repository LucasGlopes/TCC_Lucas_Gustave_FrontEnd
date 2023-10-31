import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AsoRoutingModule } from './aso-routing.module';
import { AsoHomeComponent } from './aso-home/aso-home.component';
import { AsoDetailsComponent } from './aso-details/aso-details.component';
import { AsoListComponent } from './aso-list/aso-list.component';
import { AsoHistoryComponent } from './aso-history/aso-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AsoHomeComponent,
    AsoDetailsComponent,
    AsoListComponent,
    AsoHistoryComponent
  ],
  providers: [
    DatePipe 
  ],
  imports: [
    CommonModule,
    AsoRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
  ]
})
export class AsoModule { }
