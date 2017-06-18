import {Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Video} from '../../../models/video';
import {VideosService} from '../../../services/videos.service';

import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
  private page = new Page();
  private recent = new Array();
  private hot = new Array();

  constructor(private _videos: VideosService,
              private router: Router,
              private route: ActivatedRoute) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  public ngOnInit() {
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this._videos.list(this.page).subscribe(pagedData => {
      this.recent = pagedData.data;
    });
    this._videos.list(this.page,'views').subscribe(pagedData => {
      this.hot = pagedData.data;
    });
  }

  ngOnDestroy() {

  }

}
