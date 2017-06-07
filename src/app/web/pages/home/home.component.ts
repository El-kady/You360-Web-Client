
import {Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
  public video = 'http://localhost:3000/api/videos/stream';
  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
