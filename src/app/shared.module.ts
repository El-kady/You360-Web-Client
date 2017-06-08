import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({noTokenScheme: true}), http, options);
}

import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import {CategoriesService} from './services/categories.service';
import {VideosService} from './services/videos.service';

const services = [
  AuthService,
  AlertService,
  CategoriesService,
  VideosService
];

// Helpers
import {AlertComponent} from './components/alert/alert.component';

// Shared Components
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {ImageInputComponent} from './components/image-input/image-input.component';

const components = [
  AlertComponent,
  UserMenuComponent,
  ImageInputComponent
];

@NgModule({
  imports: [RouterModule, HttpModule, CommonModule],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        },
        ...services
      ]
    };
  }
}
