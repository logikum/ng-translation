import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { NgTranslationModule } from 'ng-translation';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent }
];

@NgModule( {
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild( routes ),
    NgTranslationModule
  ],
  declarations: [
    IndexComponent
  ]
} )
export class AutumnModule { }
