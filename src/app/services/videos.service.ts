import {Video} from '../models/video';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Config} from '../app.constants';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {Page} from '../helpers/page';
import {PagedData} from '../helpers/paged-data';

@Injectable()
export class VideosService {
  headers = {headers: new Headers({'Content-Type': 'application/json'})};

  constructor(public authHttp: AuthHttp,
              private router: Router) {
  }

  public add(data) {
    return this.authHttp.post(Config.API_ENDPOINT + '/api/videos', JSON.stringify(data), this.headers).map(res => res.json());
  }

  public update(id, data) {
    return this.authHttp.put(Config.API_ENDPOINT + '/api/videos/' + id, JSON.stringify(data), this.headers).map(res => res.json());
  }

  public get(id) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/videos/' + id).map(res => res.json());
  }

  public delete(id) {
    return this.authHttp.delete(Config.API_ENDPOINT + '/api/videos/' + id).map(res => res.json());
  }

  public list(page: Page, sort = 'createdAt') {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/videos?sort=' + sort + '&page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<Video>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;

        let docs = [];
        for (let i in data.docs) {
          docs[i] = new Video(data.docs[i]);
        }

        pagedData.data = docs;

        return pagedData;
      }
    );
  }

  public userList(id, page: Page) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/users/' + id + '/videos/?page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<Video>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;

        let docs = [];
        for (let i in data.docs) {
          docs[i] = new Video(data.docs[i]);
        }

        pagedData.data = docs;

        return pagedData;
      }
    );
  }

  public categoryList(id, page: Page) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/categories/' + id + '/videos/?page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<Video>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;

        let docs = [];
        for (let i in data.docs) {
          docs[i] = new Video(data.docs[i]);
        }

        pagedData.data = docs;

        return pagedData;
      }
    );
  }

  public recommendedList(id, page: Page) {
    return this.authHttp.get(Config.API_ENDPOINT + '/api/videos/' + id + '/similar/?page=' + (page.pageNumber + 1) + '&limit=' + page.size).map(
      res => {
        const data = res.json();
        let pagedData = new PagedData<Video>();

        page.totalElements = data.total;
        page.totalPages = data.pages;

        pagedData.page = page;

        let docs = [];
        for (let i in data.docs) {
          docs[i] = new Video(data.docs[i]);
        }

        pagedData.data = docs;

        return pagedData;
      }
    );
  }

  public addComment(id, data) {
    return this.authHttp.post(Config.API_ENDPOINT + '/api/videos/' + id + '/comments', JSON.stringify(data), this.headers).map(res => res.json());
  }
}
