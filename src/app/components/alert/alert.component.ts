import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})

export class AlertComponent implements OnInit {
  message: any;

  constructor(private _alert: AlertService) {
  }

  ngOnInit() {
    this._alert.getMessage().subscribe(message => {
      if (message) {
        message.items = [];
        if (typeof message.message === 'string') {
          message.items.push({text : message.message});
        }else if (typeof message.message === 'object'){
          for (let key in message.message){
            message.items.push({text :  message.message[key].param + ' ' + message.message[key].msg});
          }
        }
        this.message = message;
      }
    });
  }

}
