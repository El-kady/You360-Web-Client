import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WebComponent} from './web.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    children: [
      {
        component: HomeComponent,
        path: ''
      },
      {
        component: RegisterComponent,
        path: 'register'
      },
      {
        component: LoginComponent,
        path: 'login'
      },
    ],
    component: WebComponent,
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WebRoutingModule { }
