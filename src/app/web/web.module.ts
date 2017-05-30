import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {WebRoutingModule} from './web-routing.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

import {AlertService} from '../services/alert.service';
import {AuthService} from '../services/auth.service';
import {CanActivateGuard} from '../services/guard.service';

let services = [
  AlertService,
  AuthService,
  CanActivateGuard
];

import {WebComponent} from './web.component';
import {AlertComponent} from './helpers/alert/alert.component';

import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

let pages = [
  AlertComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    WebRoutingModule
  ],
  declarations: [
    WebComponent,
    ...pages
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    ...services
  ],
  bootstrap: [WebComponent]
})
export class WebModule {
}
