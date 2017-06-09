import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Config} from '../app.constants';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {Page} from '../helpers/page';
import {PagedData} from '../helpers/paged-data';

@Injectable()
export class UsersService {
  headers = {headers: new Headers({'Content-Type': 'application/json'})};
  constructor(public http: Http,
              public authHttp: AuthHttp,
              private router: Router) {
  }

  public addUser(user) {
    return this.authHttp.post(Config.API_ENDPOINT + '/api/users', JSON.stringify(user), this.headers).map(res => res.json());
  }

  public updateUser(id, user) {
    return this.authHttp.put(Config.API_ENDPOINT + '/api/users/' + id, JSON.stringify(user), this.headers).map(res => res.json());
  }

  public getUser(id) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/users/' + id).map(res => res.json());
  }

  public deleteUser(id) {
    return this.authHttp.delete(Config.API_ENDPOINT + '/api/users/' + id).map(res => res.json());
  }

  public listUsers(page: Page) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/users?page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<User>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;
        pagedData.data = data.docs;

        return pagedData;
      }
    );
  }
}
