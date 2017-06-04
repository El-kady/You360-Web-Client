import {Component, OnInit, OnDestroy} from '@angular/core';
import {Config} from '../../../app.constants';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit, OnDestroy {
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: Config.API_ENDPOINT + '/upload/'
  };
  sizeLimit = 2000000;

  constructor() {
    // TODO
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}
