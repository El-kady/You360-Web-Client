import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

import {User} from '../models/user';


@Injectable()
export class CanActivateGuard implements CanActivate {
  private logged: boolean = false;

  constructor(
    private router: Router,
    private _auth: AuthService
  ) {
    this._auth.currentUser.subscribe(
      (user) => {
        this.logged = user.logged;
      },
    );
  }

  public canActivate() {
    if ( !this.logged ) {
       this.router.navigate( [ 'login' ] );
    }
    return this.logged;
  }
}
