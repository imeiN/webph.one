import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ToneService } from '../tone.service';
import { JsSipService } from '../jssip.service';
import { StorageService } from '../storage.service';

import { versions } from '../../environments/versions';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy {
  number = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>(); // = new Subject(); in Typescript 2.2-2.4

  constructor(
    private toneService: ToneService,
    public jsSip: JsSipService,
    private route: ActivatedRoute,
    private router: Router,
    public storageService: StorageService,
  ) {
    storageService.table('contacts')
      .read()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(contacts => {
      });
   }

  ngOnInit() {
    this.number = this.route.snapshot.paramMap.get('number') || '';
    if (this.route.snapshot.paramMap.get('answer') === 'true') {
        this.jsSip.setState({ autoanswer: true });
        this.router.navigate(['/call']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  existContact(number) {
    return false;
  }

  addContact(number: string) {
    this.router.navigate(['/directory', 'add', number]);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const reg = new RegExp('^[0-9]');
    if (reg.test(event.key)) {
      this.pushItem(event.key);
    }
    else if (event.key === 'Enter') {
      this.call();
    }
    else if (event.keyCode === 8 && this.number.length > 0) {
      this.number = this.number.slice(0, -1);
    }
  }

  pushItem(e) {
    this.toneService.start(e);
    this.number += e;
  }

  clean() {
    this.number = this.number.substring(0, this.number.length - 1);
  }

  call() {
    if ( this.number === '000000') {
      this.number = versions.branch + ' - ' + versions.revision;
      return;
    }
    this.jsSip.handleOutgoingCall('', this.number);
  }

  hangup() {
    this.jsSip.handleHangup();
  }

  takeIncomming() {
    this.jsSip.handleAnswerIncoming();
  }

  hangupIncomming() {
    this.jsSip.handleRejectIncoming();
  }

}
