/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { VivaldiPage } from './vivaldi/vivaldi.page';
import { SpringPage } from './spring/spring.page';
import { SummerPage } from './summer/summer.page';
import { AutumnPage } from './autumn/autumn.page';
import { WinterPage } from './winter/winter.page';

const routes: Routes = [
  { path: '', component: VivaldiPage },
  { path: 'spring', component: SpringPage },
  { path: 'summer', component: SummerPage },
  { path: 'autumn', component: AutumnPage },
  { path: 'winter', component: WinterPage }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class SeasonsRoutingModule {
}
