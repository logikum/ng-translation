/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { loadTranslations } from '@logikum/ng-translation';

const routes: Routes = [
  { path: 'model',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./model-tests/model-tests.page')
      .then(m => m.ModelTestsPage)
  },
  { path: 'general',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./general-tests/general-tests.page')
      .then(m => m.GeneralTestsPage)
  },
  { path: 'translate',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./translate-tests/translate-tests.page')
      .then(m => m.TranslateTestsPage)
  },
  { path: 'localize',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./localize-tests/localize-tests.page')
      .then(m => m.LocalizeTestsPage)
  },
  { path: 'pipe',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./pipe-tests/pipe-tests.page')
      .then(m => m.PipeTestsPage)
  },
  { path: 'conversion',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./conversion-tests/conversion-tests.page')
      .then(m => m.ConversionTestsPage)
  },
  { path: 'null',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./null-tests/null-tests.page')
      .then(m => m.NullTestsPage)
  },
  { path: 'other',
    canMatch: [ loadTranslations ],
    loadComponent: () => import('./other-tests/other-tests.page')
      .then(m => m.OtherTestsPage) },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class TestsRoutingModule { }
