import {Component, OnInit, OnDestroy} from '@angular/core';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  statistics = {
    videos: 0,
    violated_videos: 0,
    users: 0,
  };

  constructor(private _socket: SocketService,) {
    this._socket.statistics();
    this._socket.listen('users count').subscribe((data) => {
      this.statistics.users = data;
    });
    this._socket.listen('videos count').subscribe((data) => {
      this.statistics.videos = data;
    });
    this._socket.listen('violated videos count').subscribe((data) => {
      this.statistics.violated_videos = data;
    });
  }

  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}
