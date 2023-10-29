import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AsoRoutingModule } from './aso-routing.module';
import { AsoHomeComponent } from './aso-home/aso-home.component';


@NgModule({
  declarations: [
    AsoHomeComponent
  ],
  imports: [
    CommonModule,
    AsoRoutingModule,
    MatButtonModule
  ]
})
export class AsoModule { }
