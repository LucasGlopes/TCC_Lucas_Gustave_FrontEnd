import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';

const routes: Routes = [
  { path: 'campanhas', 
    component: CampaignListComponent,
  },
  { path: 'campanhas/nova', //temporário
    component: CampaignDetailsComponent,
  },
  { path: 'campanhas/:id', //temporário
    component: CampaignDetailsComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/vacinas/campanhas'  
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationRoutingModule { }
