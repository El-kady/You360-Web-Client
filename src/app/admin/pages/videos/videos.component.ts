import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Video} from '../../../models/video';
import {VideosService} from '../../../services/videos.service';
import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})

export class VideosComponent implements OnInit, OnDestroy {
  page = new Page();
  rows = new Array();

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
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  public remove(id) {
    this._videos.delete(id).subscribe(data => {
      this.setPage({offset: this.page.pageNumber});
    });
  }

  public ngOnDestroy() {

  }

}
