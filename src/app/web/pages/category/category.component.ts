import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Category} from '../../../models/category';
import {Video} from '../../../models/video';

import {VideosService} from '../../../services/videos.service';
import {CategoriesService} from '../../../services/categories.service';

import {Page} from '../../../helpers/page';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})

export class CategoryComponent implements OnInit, OnDestroy {
  private category: Category = new Category();
  private page = new Page();
  private rows = new Array();

  constructor(private _videos: VideosService,
              private _categories: CategoriesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this._categories.get(id).subscribe(data => {
        this.category = new Category(data);
        this.setPage({offset: 0});
      });
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this._videos.categoryList(this.category.getID(), this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  ngOnDestroy() {

  }

}
