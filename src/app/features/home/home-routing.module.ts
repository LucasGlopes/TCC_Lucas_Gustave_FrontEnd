import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PermissionGuard } from './../../guards/permission.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'usuarios-pendentes', 
    component: PendingUsersComponent,
    canActivate: [PermissionGuard]
  },
  {path: 'editar-usuario', component: EditUserComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
