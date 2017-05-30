import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})

export class AlertComponent implements OnInit {
  message: any;
  constructor(private _alert: AlertService) {}

  ngOnInit() {
    this._alert.getMessage().subscribe(message => { this.message = message; });
  }

}
