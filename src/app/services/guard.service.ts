import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

import {User} from '../models/user';


@Injectable()
export class CanActivateGuard implements CanActivate {
  private logged: boolean = false;
  private role = 'guest';

  constructor(private router: Router,
              private _auth: AuthService) {
    this._auth.currentUser.subscribe(
      (user) => {
        this.logged = user.logged;
        this.role = user.role.toLocaleLowerCase();
      },
    );
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.logged) {
      this.router.navigate(['login']);
    }
    let roles = route.data['roles'] as Array<string>;
    if (roles && roles.length) {
      return roles.indexOf(this.role) > -1;
    } else {
      return this.logged;
    }
  }
}
