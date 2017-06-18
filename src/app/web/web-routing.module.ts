import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CanActivateGuard} from '../services/guard.service';

import {WebComponent} from './web.component';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {UploadComponent} from './pages/upload/upload.component';
import {ChannelComponent} from './pages/channel/channel.component';
import {ViewComponent} from './pages/view/view.component';
import {CategoryComponent} from './pages/category/category.component';

export const routes: Routes = [
  {
    children: [
      {
        component: HomeComponent,
        path: ''
      },
      {
        canActivate: [CanActivateGuard],
        component: UploadComponent,
        path: 'upload',
      },
      {
        canActivate: [CanActivateGuard],
        component: ChannelComponent,
        path: 'channel/:id',
      },
      {
        canActivate: [CanActivateGuard],
        component: CategoryComponent,
        path: 'category/:id',
      },
      {
        canActivate: [CanActivateGuard],
        component: ViewComponent,
        path: 'video/:id',
      },
      {
        canActivate: [CanActivateGuard],
        loadChildren: './account/account.module#AccountModule',
        path: 'account',
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
})
export class WebRoutingModule {
}
