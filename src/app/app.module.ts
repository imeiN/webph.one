import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgServiceWorker } from '@angular/service-worker';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomMaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { CallModule } from './call/call.module';
import { JobModule } from './job/job.module';

import { ToneService } from './tone.service';
import { JsSipService } from './jssip.service';
import { StorageService } from './storage.service';
import { CallStatusComponent } from './call-status/call-status.component';
import { CallSurveyComponent } from './call-survey/call-survey.component';
import { CallSurveyService } from './call-survey.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { GuiNotificationsService } from './gui-notifications.service';

export const appRoutes: Routes  = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'call'
  },
  {
    path: 'call',
    loadChildren: './call/call.module#CallModule'
  },
  {
    path: 'job',
    loadChildren: './job/job.module#JobModule'
  },
  {
    path: '**',
    redirectTo: '/call',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CallStatusComponent,
    CallSurveyComponent,
    MessageBoxComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules,
        useHash: true
      }
    ),
    CustomMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    CallModule,
    JobModule,
  ],
  providers: [
    ToneService,
    JsSipService,
    StorageService,
    NgServiceWorker,
    CallSurveyService,
    GuiNotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
