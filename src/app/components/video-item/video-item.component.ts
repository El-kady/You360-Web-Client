import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})

export class VideoItemComponent implements OnInit {

  @Input() video;

  constructor() {
  }

  public getThumb(){
    return (this.video.getThumb() === '') ? 'assets/images/default_image.png' : this.video.getThumb();
  }

  ngOnInit() {

  }




}
