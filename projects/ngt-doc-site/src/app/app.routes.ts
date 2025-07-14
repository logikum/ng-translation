/* 3rd party libraries */
import { Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */

export const routes: Routes = [
  { path: '**',
    loadComponent: () => import('./content/content.component')
      .then(m => m.ContentComponent)
  }
];
