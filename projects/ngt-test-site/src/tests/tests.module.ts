/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* locally accessible feature module code, always use a relative path */
import { TestsRoutingModule } from './tests-routing.module';

@NgModule( {
  declarations: [],
  imports: [
    CommonModule,
    TestsRoutingModule
  ]
} )
export class TestsModule { }
