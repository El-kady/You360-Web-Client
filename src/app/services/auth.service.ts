import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Config} from '../app.constants';
import {Observable, ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public currentUser: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(public http: Http,
              public authHttp: AuthHttp,
              private router: Router) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token !== '' && user && 'logged' in user && user.logged === true) {
      this.currentUser.next(new User(user));
    }
  }

  public setCurrentUser(user: User) {
    this.currentUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(data) {
    return this.http.post(Config.API_ENDPOINT + '/api/login',
      JSON.stringify({email: data.email, password: data.password}),
      {headers: new Headers({'Content-Type': 'application/json'})}
    ).map((response: Response) => response.json());
  }

  public createUser(data) {
    return this.http.post(Config.API_ENDPOINT + '/api/register', data).map((response: Response) => response.json());
  }

  public logout() {
    let user = new User();
    user.logged = false;
    this.setCurrentUser(user);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['login']);
  }
}
