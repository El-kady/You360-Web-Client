import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {Config} from '../app.constants';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private currentUser: User = new User();
  socket: any;
  _user: any;

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
    this.socket = io.connect(Config.SOCKET_ENDPOINT);
  }

  listen(event): Observable<any> {
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}"`);
    });

    return new Observable((observer: any) => {
      this.socket.on(event, (data: any) => observer.next(data));
    });
  }

  newVideo(id: any) {
    this.socket.emit('new video created', id);
  }

  likeVideo(id: any) {
    this.socket.emit('like video', {videoId: id, userId: this.currentUser.getID()});
  }

  dislikeVideo(id: any) {
    this.socket.emit('dislike video', {videoId: id, userId: this.currentUser.getID()});
  }

  newComment(videoId, comment) {
    this.socket.emit('new comment', {videoId: videoId, comment: {owner: this.currentUser, comment: comment}});
  }

  viewVideo(videoId) {
    this.socket.emit('view video', {videoId: videoId});
  }

  // Handle connection opening
  private connect() {
    console.log(`Connected to socket`);

    // Request initial list when connected
    // this.socket.emit('login', this.appService.user);
  }

  private disconnect() {
    console.log(`Disconnected from https://you360.herokuapp.com`);
    // this.socket.emit('logout', this.appService.user);
  }
}
