/* 3rd party libraries */
import { Routes } from '@angular/router';
import { loadTranslations } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { HomePage } from './home/home.page';
import { TranslationTestsPage } from '../translation-tests/translation-tests.page';
import { ComponentTestsPage } from '../component-tests/component-tests.page';
import { LocalizationTestsPage } from '../localization-tests/localization-tests.page';
import { ConversionTestsPage } from '../conversion-tests/conversion-tests.page';
import { NullTestsPage } from '../null-tests/null-tests.page';
import { OtherTestsPage } from '../other-tests/other-tests.page';

export const routes: Routes = [
  { path: 'component', canMatch: [ loadTranslations ], component: ComponentTestsPage },
  { path: 'translation', component: TranslationTestsPage },
  { path: 'localization', canMatch: [ loadTranslations ], component: LocalizationTestsPage },
  { path: 'conversion', canMatch: [ loadTranslations ], component: ConversionTestsPage },
  { path: 'null', canMatch: [ loadTranslations ], component: NullTestsPage },
  { path: 'other', canMatch: [ loadTranslations ], component: OtherTestsPage },
  { path: '**', component: HomePage },
];
