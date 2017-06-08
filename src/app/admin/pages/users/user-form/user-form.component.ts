import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../../models/user';
import {UsersService} from '../../../../services/users.service';
import {AlertService} from '../../../../services/alert.service';
import {BasicValidators} from '../../../../helpers/basic-validators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent implements OnInit {

  form: FormGroup;
  create = true;
  title: string;
  loading = false;
  user: User = new User();
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
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  };

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _users: UsersService) {
    this.form = formBuilder.group(this.rules);
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.title = id ? 'Edit User' : 'New User';
      if (id) {
        this._users.getUser(id)
          .subscribe(
            user => {
              this.user = user;
              this.create = false;
            },
            response => {
              console.log(response);
            }
          );
      }
    });
  }

  public setImage(image) {
    this.user.image = image;
  }

  public save() {
    this.loading = true;
    let result;
    const userValue = this.form.value;

    if (this.create) {
      result = this._users.addUser(userValue);
    } else {
      result = this._users.updateUser(this.user._id, userValue);
    }

    result.subscribe(
      data => {
        this.router.navigate(['admin/users']);
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

}
