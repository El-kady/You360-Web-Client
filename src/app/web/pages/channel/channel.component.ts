import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../models/user';
import {Video} from '../../../models/video';

import {VideosService} from '../../../services/videos.service';
import {AuthService} from '../../../services/auth.service';
import {UsersService} from '../../../services/users.service';

import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html'
})

export class ChannelComponent implements OnInit, OnDestroy {
  private user: User = new User();
  private page = new Page();
  private rows = new Array();

  constructor(private _videos: VideosService,
              private _auth: AuthService,
              private _users: UsersService,
              private router: Router,
              private route: ActivatedRoute) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this._users.getUser(id).subscribe(userData => {
        this.user = new User(userData);
        this.setPage({offset: 0});
      });
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this._videos.userList(this.user.getID(), this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  ngOnDestroy() {

  }

}
