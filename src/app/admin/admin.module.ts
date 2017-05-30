import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AdminRoutingModule} from './admin-routing.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

import {AuthService} from '../services/auth.service';
import {CanActivateGuard} from '../services/guard.service';

let services = [
  AuthService,
  CanActivateGuard
];

import {AdminComponent} from './admin.component';

import {DashboardComponent} from './pages/dashboard/dashboard.component';

let pages = [
  DashboardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
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
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
