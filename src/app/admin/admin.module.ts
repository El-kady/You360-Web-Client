import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {SharedModule} from '../shared.module';
import {AdminRoutingModule} from './admin-routing.module';

import {CanActivateGuard} from '../services/guard.service';
import {UsersService} from '../services/users.service';

const services = [
  CanActivateGuard,
  UsersService
];

// Admin Wrapper
import {AdminComponent} from './admin.component';

// Dashboard
import {DashboardComponent} from './pages/dashboard/dashboard.component';

// Users CRUD
import {UsersComponent} from './pages/users/users.component';
import {UserFormComponent} from './pages/users/user-form/user-form.component';

// Categories CRUD
import {CategoriesComponent} from './pages/categories/categories.component';
import {CategoryFormComponent} from './pages/categories/category-form/category-form.component';

// Videos CRUD
import {VideosComponent} from './pages/videos/videos.component';
import {VideoFormComponent} from './pages/videos/video-form/video-form.component';

const pages = [
  DashboardComponent,

  UsersComponent,
  UserFormComponent,

  CategoriesComponent,
  CategoryFormComponent,

  VideosComponent,
  VideoFormComponent
];

@NgModule({
  imports: [
    NgxDatatableModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
