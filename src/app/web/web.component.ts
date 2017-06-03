import {Component} from '@angular/core';

import {User} from '../models/user';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})

export class WebComponent {
  private currentUser: User = new User();
  private searchInputExpanded = false;

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  toggleSearchInput() {
    this.searchInputExpanded = !this.searchInputExpanded;
  }


}
