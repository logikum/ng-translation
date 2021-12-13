import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { LoadTranslationsGuard } from 'ng-translation';

import { HomeComponent } from './home/home.component';
import { ComponentsComponent } from './components/components.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { LocalizationComponent } from './localization/localization.component';
import { NullComponent } from './null/null.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'spring',
    loadChildren: () => import('./spring/spring.module').then(m => m.SpringModule) },
  { path: 'summer',
    loadChildren: () => import('./summer/summer.module').then(m => m.SummerModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: 'autumn',
    loadChildren: () => import('./autumn/autumn.module').then(m => m.AutumnModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: 'winter',
    loadChildren: () => import('./winter/winter.module').then(m => m.WinterModule),
    canLoad: [ LoadTranslationsGuard ],
    data: { translationGroup: 'frosty' } },
  { path: 'components', component: ComponentsComponent },
  { path: 'auxiliary', component: AuxiliaryComponent },
  { path: 'l10n', component: LocalizationComponent },
  { path: 'null', component: NullComponent },
  { path: 'conversion',
    loadChildren: () => import('./conversion/conversion.module').then(m => m.ConversionModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: '**', redirectTo: 'home' }
];

const routerConfig: ExtraOptions = {
  onSameUrlNavigation: 'reload',
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
