import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CanActivateGuard} from '../services/guard.service';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UsersComponent} from './pages/users/users.component';
import {UserFormComponent} from './pages/users/user-form/user-form.component';

export const routes: Routes = [
  {
    children: [
      {
        component: DashboardComponent,
        path: 'dashboard'
      },
      {
        component: UsersComponent,
        path: 'users',
        pathMatch: 'full'
      },
      {
        component: UserFormComponent,
        path: 'users/new',
      },
      {
        component: UserFormComponent,
        path: 'users/:id'
      },
      {
        path: '',
        redirectTo: 'dashboard'
      }
    ],
    canActivate: [CanActivateGuard],
    data: {
      roles: ['admin']
    },
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
