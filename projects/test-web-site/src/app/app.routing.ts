import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { loadTranslations } from 'ng-translation';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'spring',
    loadChildren: () => import('../seasons/spring/spring.module')
      .then(m => m.SpringModule) },
  { path: 'summer',
    canMatch: [ loadTranslations ],
    loadChildren: () => import('../seasons/summer/summer.module')
      .then(m => m.SummerModule) },
  { path: 'autumn',
    canMatch: [ loadTranslations ],
    loadChildren: () => import('../seasons/autumn/autumn.module')
      .then(m => m.AutumnModule) },
  { path: 'winter',
    loadChildren: () => import('../seasons/winter/winter.module')
      .then(m => m.WinterModule),
    canMatch: [ loadTranslations ],
    data: { translationGroup: 'frosty' } },
  { path: 'test',
    loadChildren: () => import('../tests/tests.module').then(m => m.TestsModule) },
  { path: '**', redirectTo: 'home' }
];

const routerConfig: ExtraOptions = {
  // onSameUrlNavigation: 'reload',
  enableTracing: false
};

@NgModule( {
  imports: [
    RouterModule.forRoot( routes, routerConfig )
  ],
  exports: [
    RouterModule
  ]
} )
export class AppRouting { }
