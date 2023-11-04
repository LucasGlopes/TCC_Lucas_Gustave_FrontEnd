import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsoHomeComponent } from './aso-home/aso-home.component';
import { AsoHistoryComponent } from './aso-history/aso-history.component';
import { AsoListComponent } from './aso-list/aso-list.component';
import { AsoDetailsComponent } from './aso-details/aso-details.component';

const routes: Routes = [
  {
    path: '',
    component: AsoHomeComponent,
    children: [
      { path: 'historico', component: AsoHistoryComponent },
      { path: 'asos', component: AsoListComponent },
      { path: 'asos/novo', component: AsoDetailsComponent },
      { path: 'asos/:idAso', component: AsoDetailsComponent },
      { path: '',
        pathMatch: 'full',
        redirectTo: '/aso/historico'  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsoRoutingModule { }
