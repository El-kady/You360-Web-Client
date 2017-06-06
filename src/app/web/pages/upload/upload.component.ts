import {Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Config} from '../../../app.constants';

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
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  constructor() {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.model.name = fileItem.file.name;
      this.uploader.uploadAll();
      this.uploading = true;
    }
    this.uploader.onCompleteItem = (item, response, status) => {

    }
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}
