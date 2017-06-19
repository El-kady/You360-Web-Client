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
  public statesComplex: any[] = [
    {id: 1, name: 'Alabama', region: 'South'}, {id: 2, name: 'Alaska', region: 'West'}, {
      id: 3,
      name: 'Arizona',
      region: 'West'
    },
    {id: 4, name: 'Arkansas', region: 'South'}, {id: 5, name: 'California', region: 'West'},
    {id: 6, name: 'Colorado', region: 'West'}, {id: 7, name: 'Connecticut', region: 'Northeast'},
    {id: 8, name: 'Delaware', region: 'South'}, {id: 9, name: 'Florida', region: 'South'},
    {id: 10, name: 'Georgia', region: 'South'}, {id: 11, name: 'Hawaii', region: 'West'},
    {id: 12, name: 'Idaho', region: 'West'}, {id: 13, name: 'Illinois', region: 'Midwest'},
    {id: 14, name: 'Indiana', region: 'Midwest'}, {id: 15, name: 'Iowa', region: 'Midwest'},
    {id: 16, name: 'Kansas', region: 'Midwest'}, {id: 17, name: 'Kentucky', region: 'South'},
    {id: 18, name: 'Louisiana', region: 'South'}, {id: 19, name: 'Maine', region: 'Northeast'},
    {id: 21, name: 'Maryland', region: 'South'}, {id: 22, name: 'Massachusetts', region: 'Northeast'},
    {id: 23, name: 'Michigan', region: 'Midwest'}, {id: 24, name: 'Minnesota', region: 'Midwest'},
    {id: 25, name: 'Mississippi', region: 'South'}, {id: 26, name: 'Missouri', region: 'Midwest'},
    {id: 27, name: 'Montana', region: 'West'}, {id: 28, name: 'Nebraska', region: 'Midwest'},
    {id: 29, name: 'Nevada', region: 'West'}, {id: 30, name: 'New Hampshire', region: 'Northeast'},
    {id: 31, name: 'New Jersey', region: 'Northeast'}, {id: 32, name: 'New Mexico', region: 'West'},
    {id: 33, name: 'New York', region: 'Northeast'}, {id: 34, name: 'North Dakota', region: 'Midwest'},
    {id: 35, name: 'North Carolina', region: 'South'}, {id: 36, name: 'Ohio', region: 'Midwest'},
    {id: 37, name: 'Oklahoma', region: 'South'}, {id: 38, name: 'Oregon', region: 'West'},
    {id: 39, name: 'Pennsylvania', region: 'Northeast'}, {id: 40, name: 'Rhode Island', region: 'Northeast'},
    {id: 41, name: 'South Carolina', region: 'South'}, {id: 42, name: 'South Dakota', region: 'Midwest'},
    {id: 43, name: 'Tennessee', region: 'South'}, {id: 44, name: 'Texas', region: 'South'},
    {id: 45, name: 'Utah', region: 'West'}, {id: 46, name: 'Vermont', region: 'Northeast'},
    {id: 47, name: 'Virginia', region: 'South'}, {id: 48, name: 'Washington', region: 'South'},
    {id: 49, name: 'West Virginia', region: 'South'}, {id: 50, name: 'Wisconsin', region: 'Midwest'},
    {id: 51, name: 'Wyoming', region: 'West'}];

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
