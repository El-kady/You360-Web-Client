import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CanActivateGuard } from './services/guard.service';

// Components
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  // // logged routes
  // {
  //   canActivate: [CanActivateGuard],
  //   children: [
  //     {
  //       canActivate: [CanActivateGuard],
  //       component: HomeComponent,
  //       path: 'home'
  //     },
  //     {
  //       canActivate: [CanActivateGuard],
  //       component: PageNumComponent,
  //       path: 'page/:id'
  //     },
  //     {
  //       canActivate: [CanActivateGuard],
  //       component: ClientComponent,
  //       path: 'client'
  //     }
  //   ],
  //   component: LayoutsAuthComponent,
  //   path: '',
  // },
  // not logged routes
  {
    component: LoginComponent,
    path: 'login'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
