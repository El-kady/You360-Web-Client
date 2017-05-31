import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {SharedModule} from '../shared.module';
import {WebRoutingModule} from './web-routing.module';

import {AlertService} from '../services/alert.service';
import {CanActivateGuard} from '../services/guard.service';

let services = [
  AlertService,
  CanActivateGuard
];

import {WebComponent} from './web.component';
import {AlertComponent} from './helpers/alert/alert.component';

import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UploadComponent} from './pages/upload/upload.component';

let pages = [
  AlertComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  UploadComponent
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    HttpModule,
    WebRoutingModule,
  ],
  declarations: [
    WebComponent,
    ...pages
  ],
  providers: [
    ...services
  ],
  bootstrap: [WebComponent]
})
export class WebModule {
}
