import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountComponent} from './account.component';
import {OverviewComponent} from './overview/overview.component';
import {GeneralComponent} from './general/general.component';
import {PasswordComponent} from './password/password.component';


export const routes: Routes = [
  {
    children: [
      {
        component: OverviewComponent,
        path: ''
      },
      {
        component: GeneralComponent,
        path: 'general'
      },
      {
        component: PasswordComponent,
        path: 'password'
      },
    ],
    component: AccountComponent,
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {
}
