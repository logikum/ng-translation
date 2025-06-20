/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { GeneralTestsPage } from './general-tests/general-tests.page';
import { ModelTestsPage } from './model-tests/model-tests.page';
import { LocalizationTestsPage } from './localization-tests/localization-tests.page';
import { LocalizeTestsPage } from './localize-tests/localize-tests.page';
import { PipeTestsPage } from './pipe-tests/pipe-tests.page';
import { ConversionTestsPage } from './conversion-tests/conversion-tests.page';
import { NullTestsPage } from './null-tests/null-tests.page';
import { OtherTestsPage } from './other-tests/other-tests.page';
import { loadTranslations } from '@logikum/ng-translation';

const routes: Routes = [
  { path: 'model', canMatch: [ loadTranslations ], component: ModelTestsPage },
  { path: 'general', canMatch: [ loadTranslations ], component: GeneralTestsPage },
  { path: 'localization', canMatch: [ loadTranslations ], component: LocalizationTestsPage },
  { path: 'localize', canMatch: [ loadTranslations ], component: LocalizeTestsPage },
  { path: 'pipe', canMatch: [ loadTranslations ], component: PipeTestsPage },
  { path: 'conversion', canMatch: [ loadTranslations ], component: ConversionTestsPage },
  { path: 'null', canMatch: [ loadTranslations ], component: NullTestsPage },
  { path: 'other', canMatch: [ loadTranslations ], component: OtherTestsPage },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class TestsRoutingModule { }
