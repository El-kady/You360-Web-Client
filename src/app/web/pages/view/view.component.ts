import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Video} from '../../../models/video';
import {VideosService} from '../../../services/videos.service';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit, OnDestroy {
  // public video = 'http://localhost:3000/api/videos/stream';
  public video: Video = new Video();

  constructor(private _videos: VideosService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this._videos.get(id).subscribe(videoData => {
        this.video = new Video(videoData);
        console.log(this.video);
      });
    });
  }

  ngOnDestroy() {

  }

}
