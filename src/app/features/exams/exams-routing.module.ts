import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsHomeComponent } from './exams-home/exams-home.component';
import { ExamsHistoryComponent } from './exams-history/exams-history.component';
import { ExamsSchedulingComponent } from './exams-scheduling/exams-scheduling.component';
import { ExamsDetailsComponent } from './exams-details/exams-details.component';

const routes: Routes = [
  {
    path: '', component: ExamsHomeComponent,
    children: [
      {path: 'historico', component: ExamsHistoryComponent},
      {path: 'agendamentos', component: ExamsSchedulingComponent},
      {path: 'agendamentos/novo-exame', component: ExamsDetailsComponent},
      {path: 'agendamentos/:idExame', component: ExamsDetailsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
