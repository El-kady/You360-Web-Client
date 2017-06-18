import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {BasicValidators} from '../../../helpers/basic-validators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})

export class PasswordComponent implements OnInit, OnDestroy {
  private currentUser: User = new User();

  form: FormGroup;
  loading = false;
  user: User = new User();

  rules = {
    current: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    confirm: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
  };

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _users: UsersService,
              private _auth: AuthService) {
    this.form = formBuilder.group(this.rules);
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
