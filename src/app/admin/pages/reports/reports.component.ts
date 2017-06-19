import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Report} from '../../../models/report';
import {ReportsService} from '../../../services/reports.service';
import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})

export class ReportsComponent implements OnInit, OnDestroy {
  page = new Page();
  rows = new Array();

  constructor(private _reports: ReportsService,
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
    this._reports.list(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  public remove(id) {
    this._reports.delete(id).subscribe(data => {
      this.setPage({offset: this.page.pageNumber});
    });
  }

  public ngOnDestroy() {

  }

}
