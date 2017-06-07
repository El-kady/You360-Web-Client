import {Component, ElementRef, OnInit, OnDestroy, Input, AfterViewInit, ViewChild} from '@angular/core';

declare var videojs: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('src') src: any;
  @Input('width') width: any;
  @Input('height') height: any;
  @ViewChild('player') _player: ElementRef;
  private videoJSplayer: any;

  constructor(player: ElementRef) {
    this._player = player;
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    const options = {
      plugins: {
        panorama: {
          clickAndDrag: true,
          clickToToggle: true,
          autoMobileOrientation: true
        }
      }
    };
    this.videoJSplayer = videojs(this._player.nativeElement, options, function () {
      // This is functionally the same as the previous example.
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }


}
