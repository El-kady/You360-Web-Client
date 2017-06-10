
import {Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {BasicValidators} from '../../../helpers/basic-validators';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})

export class GeneralComponent implements OnInit, OnDestroy {
  private currentUser: User = new User();

  form: FormGroup;
  loading = false;
  user: User = new User();
  imagePreview = '';

  rules = {
    firstName: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    email: ['', [
      Validators.required,
      BasicValidators.email
    ]],
  };

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _users: UsersService,
              private _auth: AuthService
  ) {
    this.form = formBuilder.group(this.rules);
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  ngOnInit() {
    this._users.getUser(this.currentUser.getID())
      .subscribe(
        user => {
          this.user = new User(user);
          this.imagePreview = this.user.getImage();
        },
        response => {
          console.log(response);
        }
      );
  }

  public setImage(image) {
    this.user.image = image;
  }

  public save() {
    this.loading = true;
    this._users.updateUser(this.currentUser.getID(), this.user).subscribe(
      data => {
        this._alert.success('Account has been successfully updated.');
        this.loading = false;
        this._auth.logout();
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {

  }

}
