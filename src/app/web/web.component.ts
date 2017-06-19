import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../models/user';
import {Category} from '../models/category';

import {AuthService} from '../services/auth.service';
import {CategoriesService} from '../services/categories.service';
import {Page} from '../helpers/page';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})

export class WebComponent implements OnInit {
  public categoriesPage = new Page();
  public categories = new Array();

  public currentUser: User = new User();
  public searchInputExpanded = false;

  constructor(
    private _auth: AuthService,
    private _categories: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoriesPage.pageNumber = 0;
    this.categoriesPage.size = 10;

    this._auth.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      if (this.currentUser.logged) {
        this._categories.list(this.categoriesPage).subscribe(pagedData => {
          this.categories = pagedData.data;
        });
      }
    });
  }

  public ngOnInit() {

  }

  toggleSearchInput() {
    this.searchInputExpanded = !this.searchInputExpanded;
  }

}
