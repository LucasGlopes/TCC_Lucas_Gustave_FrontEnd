import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { VaccinationHomeComponent } from './vaccination-home/vaccination-home.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationSchedulingComponent } from './vaccination-scheduling/vaccination-scheduling.component';
import { VaccinationHistoryComponent } from './vaccination-history/vaccination-history.component';
import { PermissionGuard } from './../../guards/permission.guard';

const routes: Routes = [
  {
    path: '', component: VaccinationHomeComponent,
    children: [
        { path: 'campanhas', component: CampaignListComponent },
        { 
          path: 'campanhas/nova', 
          component: CampaignDetailsComponent,
          canActivate: [PermissionGuard]
        },
        { 
          path: 'campanhas/:id', 
          component: CampaignDetailsComponent,
          canActivate: [PermissionGuard]
        },
        { path: 'historico', component: VaccinationHistoryComponent },
        { 
          path: 'agendamentos', 
          component: VaccinationListComponent,
          canActivate: [PermissionGuard]
        },
        { 
          path: 'agendamentos/nova', 
          component: VaccinationSchedulingComponent,
          canActivate: [PermissionGuard]
        },
        { path: '',
          pathMatch: 'full',
          redirectTo: '/vacinas/campanhas'  
        }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationRoutingModule { }
