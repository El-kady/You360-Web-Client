import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CanActivateGuard} from '../services/guard.service';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    children: [
      {
        component: DashboardComponent,
        path: ''
      },
    ],
    canActivate: [CanActivateGuard],
    data: { roles: ['admin'] },
    component: AdminComponent,
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule {
}
