import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../material.module';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
@NgModule({
  imports: [
    CommonModule,
    JobRoutingModule,
    CustomMaterialModule,
    FormsModule
  ],
  declarations: [JobComponent]
})
export class JobModule { }
