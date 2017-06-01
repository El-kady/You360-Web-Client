import {Component} from '@angular/core';

import {User} from '../models/user';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  private currentUser: User = new User();

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

}
