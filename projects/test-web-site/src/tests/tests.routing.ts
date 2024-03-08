import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { loadTranslations } from 'ng-translation';

import { ComponentsComponent } from './components/components.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { LocalizationComponent } from './localization/localization.component';
import { NullComponent } from './null/null.component';
import { CamelCaseComponent } from './camel-case/camel-case.component';

const routes: Routes = [
  { path: 'components', component: ComponentsComponent },
  { path: 'auxiliary', component: AuxiliaryComponent },
  { path: 'l10n', component: LocalizationComponent },
  { path: 'null', component: NullComponent },
  {
    path: 'conversion',
    canMatch: [ loadTranslations ],
    loadChildren: () => import('./conversion/conversion.module').then( m => m.ConversionModule )
  },
  { path: 'camel-case', component: CamelCaseComponent }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class TestsRouting { }
