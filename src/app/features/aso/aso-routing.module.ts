import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsoHomeComponent } from './aso-home/aso-home.component';

const routes: Routes = [
  {
    path: '',
    component: AsoHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsoRoutingModule { }
