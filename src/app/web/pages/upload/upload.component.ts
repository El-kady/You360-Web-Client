import {Component, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Router, ActivatedRoute} from '@angular/router';

import {Config} from '../../../app.constants';
import {Page} from '../../../helpers/page';

import {Category} from '../../../models/category';
import {CategoriesService} from '../../../services/categories.service';

import {Video} from '../../../models/video';
import {VideosService} from '../../../services/videos.service';

import {AlertService} from '../../../services/alert.service';

const URL = Config.API_ENDPOINT + '/api/videos/upload';
const AUTHTOKEN = localStorage.getItem('token');

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit, OnDestroy {
  model: any = {};
  loading = false;

  public uploader: FileUploader = new FileUploader(
    {
      url: URL,
      authToken: AUTHTOKEN,
      itemAlias: 'video'
    }
  );
  public uploading: boolean = false;
  public currentProgress: number = 0;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public categoriesList = [];

  constructor(private detector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _categories: CategoriesService,
              private _videos: VideosService) {

    this.uploader.onAfterAddingFile = (fileItem) => {
      this.model.name = fileItem.file.name;
      this.uploader.uploadAll();
      this.uploading = true;
    };
    this.uploader.onProgressAll = (progress: any) => this.detector.detectChanges();

    this.uploader.onCompleteItem = (item, json, status) => {
      const response = JSON.parse(json);
      this.model.filename = response.filename;
    };
  }

  public selected(value: any): void {
    this.model.category = value.id;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public ngOnInit() {
    let page = new Page();
    page.size = 100;
    page.pageNumber = 0;

    this._categories.list(page).subscribe(pagedData => {
      for (let i = 0; i < pagedData.data.length; i++) {
        this.categoriesList.push(new Category(pagedData.data[i]).toSelectItem());
      }
    });
  }

  public publish() {
    this._videos.add(this.model).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['']);
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

  public ngOnDestroy() {

  }

}
