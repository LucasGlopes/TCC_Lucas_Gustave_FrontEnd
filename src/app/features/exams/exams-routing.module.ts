import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsHomeComponent } from './exams-home/exams-home.component';
import { ExamsHistoryComponent } from './exams-history/exams-history.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { ExamsDetailsComponent } from './exams-details/exams-details.component';
import { PermissionGuard } from './../../guards/permission.guard';


const routes: Routes = [
  {
    path: '', component: ExamsHomeComponent,
    children: [
      {path: 'historico', component: ExamsHistoryComponent},
      {
        path: 'agendamentos', 
        component: ExamsListComponent,
        canActivate: [PermissionGuard]
      },
      {
        path: 'agendamentos/novo-exame', 
        component: ExamsDetailsComponent,
        canActivate: [PermissionGuard]
      },
      {
        path: 'agendamentos/:idExame', 
        component: ExamsDetailsComponent,
        canActivate: [PermissionGuard]
      },
      { 
        path: '',
        pathMatch: 'full',
        redirectTo: '/exames/historico'  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
