import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgTranslationModule } from 'ng-translation';

import { TestsRoutingModule } from './tests-routing.module';

import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { ComponentsComponent } from './components/components.component';
import { LocalizationComponent } from './localization/localization.component';
import { NullComponent } from './null/null.component';

@NgModule( {
  imports: [
    CommonModule,
    NgTranslationModule,
    TestsRoutingModule,
    FormsModule
  ],
  declarations: [
    ComponentsComponent,
    AuxiliaryComponent,
    LocalizationComponent,
    NullComponent
  ]
} )
export class TestsModule { }
