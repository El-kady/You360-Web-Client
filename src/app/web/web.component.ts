import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../models/user';
import {Category} from '../models/category';

import {AuthService} from '../services/auth.service';
import {VideosService} from '../services/videos.service';
import {CategoriesService} from '../services/categories.service';
import {Page} from '../helpers/page';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';


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

  public asyncSelected: string;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<any>;

  constructor(private _auth: AuthService,
              private _categories: CategoriesService,
              private _videos: VideosService,
              private router: Router,
              private route: ActivatedRoute) {
    this.dataSource = Observable
      .create((observer: any) => {
        observer.next(this.asyncSelected);
      }).mergeMap((token: string) => this.getResultAsObservable(token));

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

  public getResultAsObservable(token: string): Observable<any> {
    return Observable.of(
      this._videos.search(token)
    );
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }


}
