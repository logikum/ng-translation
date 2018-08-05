import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgTranslationModule } from '../../../projects/ng-translation/src/lib/ng-translation.module';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent }
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
export class MusicModule { }
