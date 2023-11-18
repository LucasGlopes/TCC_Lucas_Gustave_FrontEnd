import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'vacinas',
    loadChildren: () => import('./features/vaccination/vaccination.module').then(m => m.VaccinationModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'exames',
    loadChildren: () => import('./features/exams/exams.module').then(m => m.ExamsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'aso',
    loadChildren: () => import('./features/aso/aso.module').then(m => m.AsoModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
    canActivate: [PermissionGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
