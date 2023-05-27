import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { JsSipService } from './jssip.service';
import { CallSurveyService } from './call-survey.service';
import { GuiNotificationsService } from './gui-notifications.service';
// import { versions } from '../environments/versions';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

// Until it is decided to remove the support
// to the versions prior to the release.
import * as LocalForage from 'localforage';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** This object manages the top navigation bar. */
  public links: any[] = [
    { label: 'Call', link: '/call' },
    { label: 'Job', link: '/job' }
  ];

  constructor(
    public iconRegistry: MdIconRegistry,
    public sanitizer: DomSanitizer,
    public jsSip: JsSipService,
    public storageService: StorageService,
    public callSurveyService: CallSurveyService,
    public notificationsGui: GuiNotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
   ) {

    // Apply migration from the old database.
    // this.checkVersion();
    // this.checkDB().then( () => {
      this.loadUser();
    // });
    this.loadIcons([
      'call-end',
      'call',
      'contact-add',
      'arrow-down',
      'person',
      'star-full',
      'star-border',
      'close'
    ]);

    // Listen for autoanswer and autoreject messages
  //   navigator.serviceWorker.addEventListener('message', x => {
  //     if ( typeof x.data.autoanswer !== 'undefined' && x.data.autoanswer === true) {
  //       setTimeout(() => this.jsSip.handleAnswerIncoming(), 2000);
  //     }
  //     if ( typeof x.data.autoreject !== 'undefined' && x.data.autoreject === true) {
  //       this.jsSip.handleRejectIncoming();
  //     }
  //   });
  }

  /**
   * Load svg files into material-icons
   * @param icons  Array of svg file names to load, without the extension
   */
  loadIcons (icons: string[]) {
    icons.forEach( icon =>
      this.iconRegistry
        .addSvgIcon(
          icon,
          this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + icon + '.svg')
        )
    );
  }

  /**
   * Initialize the user system.
   * Load the local database and try to recover the user's data.
   * If they do not exist try to create one automatically.
   */
  loadUser () {
    let connected = false;
            if (connected === false) {
              this.jsSip.connect({
                uri: 'sip:1008@voice.91wangame.com',
                user: "1008",
                password: "Fulin@888"
              });
            }
            connected = true;
        //   }
        // });
      // }
    // );
  }

  firstTimeMessage() {
    if (navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i)) {
      setTimeout(() => this.notificationsGui.send({text: `Your browser may not automatically
      offer you the option to add a shortcut to this application. You can do it manually by
      selecting the options in the upper right corner, and then in the "Add to home screen"`,
      timeout: 10000}), 12000);
    }
  }

  // checkVersion() {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json; charset=utf-8');
  //   headers.append('Cache-Control', 'no-cache');
  //   headers.append('Cache-Control', 'no-store');
  //   headers.append('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');

  //   const requestOptions = new RequestOptions({
  //     headers: headers,
  //     method: 'GET'
  //   });
  //   this.http.request('version.json', requestOptions).toPromise()
  //     .then(x => x.json())
  //     .then(version => {
  //       console.log('[APP UPDATE] - Check version' , version);
  //       if (versions.revision !== version.revision ) {
  //         navigator.serviceWorker.getRegistration()
  //           .then(registration => registration.update())
  //           .then(result => console.log('[APP UPDATE] - Updated' , version));
  //       } else {
  //         console.log('[APP UPDATE] - You have the current version', version.revision);
  //       }
  //   }).catch(
  //   err => console.log('[APP UPDATE] - Fail to get actual version'));
  // }

}
