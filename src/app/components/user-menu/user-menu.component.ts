import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
  @Input() user;
  public image = '';

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.image = (this.user.getImage() === '') ? 'assets/images/avatar-default.png' : this.user.getImage();
  }

  logout() {
    this._auth.logout();
  }

}
