/* 3rd party libraries */
import { Routes } from '@angular/router';
import { loadTranslations } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { HomePage } from './home/home.page';

export const routes: Routes = [
  { path: 'seasons',
    canMatch: [ loadTranslations ],
    loadChildren: () => import('../seasons/seasons.module')
      .then(m => m.SeasonsModule)
  },
  { path: 'tests',
    canMatch: [ loadTranslations ],
    loadChildren: () => import('../tests/tests.module')
      .then(m => m.TestsModule)
  },
  { path: '**', component: HomePage },
];
