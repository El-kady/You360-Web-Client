import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../models/user';
import {Video} from '../../../models/video';
import {Comment} from '../../../models/comment';
import {VideosService} from '../../../services/videos.service';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit, OnDestroy {
  // public video = 'http://localhost:3000/api/videos/stream';
  private currentUser: User = new User();
  public video: Video = new Video();
  public commentModel: any = {};
  public commentLoading = false;

  constructor(private _videos: VideosService,
              private router: Router,
              private _auth: AuthService,
              private _alert: AlertService,
              private route: ActivatedRoute) {
    this._auth.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this._videos.get(id).subscribe(videoData => {
        this.video = new Video(videoData);
        console.log(videoData);
        console.log(this.video);
      });
    });
  }

  public addComment() {
    this.commentLoading = true;
    this._videos.addComment(this.video.getID(), this.commentModel).subscribe(
      data => {
        this.commentLoading = false;
        this.video.comments.push(new Comment({comment : this.commentModel.comment , owner : this.currentUser}));
        this.commentModel.comment = '';
      },
      error => {
        this._alert.error(error.json());
        this.commentLoading = false;
      }
    );
  }

  ngOnDestroy() {

  }

}
