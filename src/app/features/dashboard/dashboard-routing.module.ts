import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pending-users', component: PendingUsersComponent},
  {path: 'edit-user', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
