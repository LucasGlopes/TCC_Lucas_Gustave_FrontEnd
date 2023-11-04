import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';

const routes: Routes = [
  {
    path: '', component: DashboardHomeComponent,
    children: [
      {path: 'visao-geral', component: DashboardChartsComponent},
      { 
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/visao-geral'  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
