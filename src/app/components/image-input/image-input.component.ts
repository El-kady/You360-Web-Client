import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})

export class ImageInputComponent implements OnInit {

  @Output() srcChanged = new EventEmitter();
  @Input() srcStr;

  public file_src = 'assets/images/default_image.png';
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  fileChange(input) {
    this.readFiles(input.files);
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

  readFiles(files, index = 0) {
    const reader = new FileReader();
    if (index in files) {
      this.readFile(files[index], reader, (result) => {
        let img = document.createElement("img");
        img.src = result;
        this.resize(img, 250, 250, (resized_jpeg, before, after) => {
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);
          this.file_src = resized_jpeg;
          this.srcChanged.emit(resized_jpeg);
          this.readFiles(files, index + 1);
        });
      });
    } else {
      this.changeDetectorRef.detectChanges();
    }
  }

  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    return img.onload = () => {
      var width = img.width;
      var height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      var canvas = document.createElement("canvas");
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');
      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }


}
