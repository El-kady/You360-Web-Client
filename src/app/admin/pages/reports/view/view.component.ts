import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Report} from '../../../../models/report';
import {ReportsService} from '../../../../services/reports.service';
import {AlertService} from '../../../../services/alert.service';


@Component({
  selector: 'app-view-report',
  templateUrl: './view.component.html'
})

export class ReportsViewComponent implements OnInit {
  report: Report = new Report();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _reports: ReportsService) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this._reports.get(id)
          .subscribe(
            report => {
              this.report = new Report(report);
            },
            response => {
              console.log(response);
            }
          );
      }
    });
  }

  approve(){
    this._reports.approve(this.report.getID()).subscribe(
      data => {
        this.router.navigate(['admin/reports']);
      },
      error => {
        this._alert.error(error.json());
      }
    );
  }

  public remove() {
    this._reports.delete(this.report.getID()).subscribe(data => {
      this.router.navigate(['admin/reports']);
    });
  }

}
