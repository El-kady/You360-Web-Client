import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../../shared.module';
import {AccountRoutingModule} from './account-routing.module';

import {UsersService} from '../../services/users.service';

const services = [
  UsersService
];

import {AccountComponent} from './account.component';

import {OverviewComponent} from './overview/overview.component';
import {GeneralComponent} from './general/general.component';


const pages = [
  OverviewComponent,
  GeneralComponent
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
  ],
  declarations: [
    AccountComponent,
    ...pages,
  ],
  providers: [
    ...services
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule {
}
