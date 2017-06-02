import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../models/user';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private _alert: AlertService,
              private _auth: AuthService) {
  }

  login() {
    this.loading = true;
    this._auth.getUser(this.model).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        let user = new User(data.user);
        user.logged = true;
        this._auth.setCurrentUser(user);

        this._alert.success('You have been logged in.', true);
        this.router.navigate(['']);
      },
      error => {
        this._alert.error('Wrong password or email.');
        this.loading = false;
      });
  }

  public ngOnInit() {

  }
}
