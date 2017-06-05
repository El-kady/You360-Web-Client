import {Category} from '../models/category';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Config} from '../app.constants';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {Page} from '../helpers/page';
import {PagedData} from '../helpers/paged-data';

@Injectable()
export class CategoriesService {

  constructor(public authHttp: AuthHttp,
              private router: Router) {
  }

  public add(user) {
    return this.authHttp.post(Config.API_ENDPOINT + '/api/categories', JSON.stringify(user), {headers: new Headers({'Content-Type': 'application/json'})}).map(res => res.json());
  }

  public update(id, user) {
    return this.authHttp.put(Config.API_ENDPOINT + '/api/categories/' + id, JSON.stringify(user)).map(res => res.json());
  }

  public get(id) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/categories/' + id).map(res => res.json());
  }

  public delete(id) {
    return this.authHttp.delete(Config.API_ENDPOINT + '/api/categories/' + id).map(res => res.json());
  }

  public list(page: Page) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/categories?page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<Category>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;
        pagedData.data = data.docs;

        return pagedData;
      }
    );
  }
}
