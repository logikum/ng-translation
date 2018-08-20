import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgTranslationModule } from 'ng-translation';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'films', component: IndexComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    NgTranslationModule.forChild()
  ],
  declarations: [
    IndexComponent
  ]
})
export class FilmsModule { }
