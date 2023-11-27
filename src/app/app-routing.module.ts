import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';
import { AuthActivateGuard } from './guards/auth-activate.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthActivateGuard]
  },
  {
    path: 'vacinas',
    loadChildren: () => import('./features/vaccination/vaccination.module').then(m => m.VaccinationModule),
    canLoad: [AuthGuard],
    canActivate: [AuthActivateGuard]
  },
  {
    path: 'exames',
    loadChildren: () => import('./features/exams/exams.module').then(m => m.ExamsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthActivateGuard]
  },
  {
    path: 'aso',
    loadChildren: () => import('./features/aso/aso.module').then(m => m.AsoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthActivateGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
    canActivate: [PermissionGuard, AuthActivateGuard]
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
