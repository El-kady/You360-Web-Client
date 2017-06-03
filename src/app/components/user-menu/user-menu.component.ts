import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
})

export class UserMenuComponent implements OnInit {
  @Input() user;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
  }

}
