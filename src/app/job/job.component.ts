import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import { versions } from '../../environments/versions';
import { GuiNotificationsService } from '../gui-notifications.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(
    public dialog: MdDialog,
    private router: Router,
    private _http: Http,
    private _guiNotifications: GuiNotificationsService
  ) { }

  message = 'Try webph.one';
  href: string;
  numbers: string;

  ngOnInit() {
    this.href = window.location.href.split(this.router.url)[0];
  }

  sendJob() {
    if (this.numbers !== '') {
      const body = Object.assign({}, {
        numbers: this.numbers,
      }, versions);
      this._http.post(environment.endpoint + '/robot/call', body)
        .subscribe(
          (x) => {
            this._guiNotifications.send({text: '任务提交成功.'});
            this.numbers = '';
          },
          (x) => this._guiNotifications.send({text: '任务提交失败.'})
        );
    }
    else {
      this._guiNotifications.send({text: '话单为空，请先输入话单，用逗号隔开.'});
    }
  }
}
