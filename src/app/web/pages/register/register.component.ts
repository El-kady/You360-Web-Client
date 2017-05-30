import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private _alert: AlertService,
              private _auth: AuthService) {

  }

  register() {
    this.loading = true;
    this._auth.createUser(this.model).subscribe(
      data => {
        this._alert.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this._alert.error(error.json().error);
        this.loading = false;
      });
  }

  public ngOnInit() {
    // to do
  }
}
