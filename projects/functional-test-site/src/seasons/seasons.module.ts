/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* locally accessible feature module code, always use relative path */
import { SeasonsRoutingModule } from './seasons-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeasonsRoutingModule
  ],
})
export class SeasonsModule { }
