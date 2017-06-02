import {Component, OnInit, OnDestroy} from '@angular/core';

import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';
import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit, OnDestroy {
  page = new Page();
  rows = new Array<User>();

  constructor(private _users: UsersService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  public ngOnInit() {
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this._users.listUsers(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  public ngOnDestroy() {

  }

}
