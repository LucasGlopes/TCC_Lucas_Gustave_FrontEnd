import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { VaccinationRoutingModule } from './vaccination-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { VaccinationHomeComponent } from './vaccination-home/vaccination-home.component';
import { VaccinationSchedulingComponent } from './vaccination-scheduling/vaccination-scheduling.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { VaccinationHistoryComponent } from './vaccination-history/vaccination-history.component';
import { VaccinationStatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CampaignListComponent,
    CampaignDetailsComponent,
    VaccinationHomeComponent,
    VaccinationSchedulingComponent,
    VaccinationListComponent,
    VaccinationHistoryComponent,
    VaccinationStatusDialogComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    VaccinationRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class VaccinationModule { }
