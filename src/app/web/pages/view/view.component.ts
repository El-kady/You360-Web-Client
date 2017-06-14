import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../../../models/user';
import {Video} from '../../../models/video';
import {Comment} from '../../../models/comment';
import {VideosService} from '../../../services/videos.service';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {SocketService} from '../../../services/socket.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit, OnDestroy {
  private currentUser: User = new User();
  public video: Video = new Video();
  public commentModel: any = {};
  public commentLoading = false;

  constructor(private _videos: VideosService,
              private router: Router,
              private _auth: AuthService,
              private _alert: AlertService,
              private _socket: SocketService,
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

        this._socket.viewVideo(this.video.getID());

        this._socket.listen(`${this.video.getID()}_likes`).subscribe((data) => {
          this.video.dislikes = data.dislikes;
          this.video.likes = data.likes;
        });
        this._socket.listen(`${this.video.getID()}_dislikes`).subscribe((data) => {
          this.video.dislikes = data.dislikes;
          this.video.likes = data.likes;
        });

        this._socket.listen(`${this.video.getID()}_comments`).subscribe((data) => {
          const comments = data || [];
          for (let i in comments) {
            this.video.comments[i] = new Comment(comments[i]);
          }
          console.log(this.video.comments)
        });

        this._socket.listen(`${this.video.getID()}_views`).subscribe((data) => {
          this.video.views = data;
        });

      });
    });
  }

  public like() {
    // console.log('like');
    // this.likeIcon="thumbs-up";
    // this.dislikeIcon="thumbs-down-outline"
    // this.video.liked=true;
    // this.video.disliked=false;
    this._socket.likeVideo(this.video.getID());
  }

  dislike() {
    // this.likeIcon="thumbs-up-outline";
    // this.dislikeIcon="thumbs-down"
    // this.video.liked=false;
    // this.video.disliked=true;
    this._socket.dislikeVideo(this.video.getID());
  }

  public addComment() {
    this._socket.newComment(this.video.getID(), this.commentModel.comment);
    this.commentModel.comment = '';
    // this.commentLoading = true;
    // this._videos.addComment(this.video.getID(), this.commentModel).subscribe(
    //   data => {
    //     this.commentLoading = false;
    //     this.video.comments.push(new Comment({comment: this.commentModel.comment, owner: this.currentUser}));
    //     this.commentModel.comment = '';
    //   },
    //   error => {
    //     this._alert.error(error.json());
    //     this.commentLoading = false;
    //   }
    // );
  }

  ngOnDestroy() {

  }

}
