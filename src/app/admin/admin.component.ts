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
  private sideBarItems = [
    {
      title: 'Dashboard',
      icon: 'fa-area-chart',
      route: '/admin/dashboard'
    },
    {
      title: 'Categories',
      icon: 'fa-list',
      route: '/admin/categories'
    },
    {
      title: 'Videos',
      icon: 'fa-video-camera',
      route: '/admin/videos'
    },
    {
      title: 'Users',
      icon: 'fa-users',
      route: '/admin/users'
    },
  ];

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

}
