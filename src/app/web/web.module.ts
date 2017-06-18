import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import {SelectModule} from 'ng2-select';
import {RlTagInputModule} from 'angular2-tag-input';

import {FileUploadModule} from 'ng2-file-upload';

import {SharedModule} from '../shared.module';
import {WebRoutingModule} from './web-routing.module';

import {CanActivateGuard} from '../services/guard.service';

const services = [
  CanActivateGuard
];

import {WebComponent} from './web.component';

import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UploadComponent} from './pages/upload/upload.component';
import {ChannelComponent} from './pages/channel/channel.component';
import {CategoryComponent} from './pages/category/category.component';
import {ViewComponent} from './pages/view/view.component';
import {PlayerComponent} from '../components/player/player.component';

const pages = [
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  UploadComponent,
  ViewComponent,
  ChannelComponent,
  CategoryComponent
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
    SelectModule,
    RlTagInputModule
  ],
  declarations: [
    WebComponent,
    ...pages,
    PlayerComponent,
  ],
  providers: [
    ...services
  ],
  bootstrap: [WebComponent]
})
export class WebModule {
}
