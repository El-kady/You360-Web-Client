import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {SharedModule} from '../shared.module';
import {AdminRoutingModule} from './admin-routing.module';

import {CanActivateGuard} from '../services/guard.service';

let services = [
  CanActivateGuard
];

import {AdminComponent} from './admin.component';

import {DashboardComponent} from './pages/dashboard/dashboard.component';

let pages = [
  DashboardComponent,
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    ...pages
  ],
  providers: [
    ...services
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
