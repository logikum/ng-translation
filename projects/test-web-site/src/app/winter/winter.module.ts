import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material';

import { NgTranslationModule } from 'ng-translation';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild( routes ),
    NgTranslationModule.forChild()
  ],
  declarations: [
    IndexComponent
  ]
})
export class WinterModule { }
