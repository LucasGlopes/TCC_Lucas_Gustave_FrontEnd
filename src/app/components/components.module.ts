import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from "@angular/router";
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { PdfPageComponent } from './pdf-page/pdf-page.component';

@NgModule({
  declarations: [
    NavBarComponent,
    UserDialogComponent,
    CalendarHeaderComponent,
    EventDialogComponent,
    PdfPageComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    CalendarModule
  ],
  exports: [
    NavBarComponent,
    UserDialogComponent,
    CalendarHeaderComponent,
    EventDialogComponent,
  ]
})
export class ComponentsModule { }
