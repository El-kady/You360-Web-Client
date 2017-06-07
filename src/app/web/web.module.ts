import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ngx-bootstrap';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


import {FileUploadModule} from 'ng2-file-upload';

import {SharedModule} from '../shared.module';
import {WebRoutingModule} from './web-routing.module';

import {CanActivateGuard} from '../services/guard.service';

let services = [
  CanActivateGuard
];

import {WebComponent} from './web.component';

import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UploadComponent} from './pages/upload/upload.component';
import { PlayerComponent } from './player/player.component';

let pages = [
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
    FileUploadModule,
    HttpModule,
    WebRoutingModule,
    Ng2BootstrapModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  declarations: [
    WebComponent,
    ...pages,
    PlayerComponent,
  ],
  providers: [
    ...services
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [WebComponent]
})
export class WebModule {
}
