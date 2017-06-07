import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {Video} from '../../../../models/video';
import {VideosService} from '../../../../services/videos.service';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html'
})

export class VideoFormComponent implements OnInit {

  form: FormGroup;
  create = true;
  title: string;
  loading = false;
  video: Video = new Video();

  rules = {
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    description: ['', [
      Validators.maxLength(255)
    ]],
  };

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _videos: VideosService) {
    this.form = formBuilder.group(this.rules);
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.title = id ? 'Edit Category' : 'New Category';
      if (id) {
        this._videos.get(id)
          .subscribe(
            category => {
              this._videos = category;
              this.create = false;
            },
            response => {
              console.log(response);
            }
          );
      }
    });
  }

  public save() {
    this.loading = true;
    let result;
    const userValue = this.form.value;

    if (this.create) {
      result = this._videos.add(userValue);
    } else {
      result = this._videos.update(this.video._id, userValue);
    }

    result.subscribe(
      data => {
        this.router.navigate(['admin/videos']);
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

}
