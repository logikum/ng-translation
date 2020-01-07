import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PATH } from '../shared';
import * as pages from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
  { path: PATH.setup, component: pages.SetupComponent },
  { path: PATH.configuration, component: pages.ConfigurationComponent },
  { path: PATH.usage, component: pages.UsageComponent },
  { path: PATH.selectionList, component: pages.SelectionListComponent },
  { path: PATH.textList, component: pages.TextListComponent },
  { path: PATH.api, component: pages.ApiComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
})
export class V10Routing { }
