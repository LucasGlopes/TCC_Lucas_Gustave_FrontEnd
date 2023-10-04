import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { VaccinationHomeComponent } from './vaccination-home/vaccination-home.component';


const routes: Routes = [
  {
    path: '', component: VaccinationHomeComponent,
    children: [
        { path: 'campanhas', component: CampaignListComponent },
        { path: 'campanhas/nova', component: CampaignDetailsComponent },
        { path: 'campanhas/:id', component: CampaignDetailsComponent },
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
