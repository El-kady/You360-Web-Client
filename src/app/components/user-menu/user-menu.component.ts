import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
})

export class UserMenuComponent implements OnInit {
  @Input() user;

  constructor() {
  }

  ngOnInit() {
  }

}
