import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Category} from '../../../models/category';
import {CategoriesService} from '../../../services/categories.service';
import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit, OnDestroy {
  page = new Page();
  rows = new Array();

  constructor(private _categories: CategoriesService,
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
    this._categories.list(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  public remove(id) {
    this._categories.delete(id).subscribe(data => {
      this.setPage({offset: this.page.pageNumber});
    });
  }

  public ngOnDestroy() {

  }

}
