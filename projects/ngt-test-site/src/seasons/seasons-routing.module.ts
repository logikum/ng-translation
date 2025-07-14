/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'vivaldi'
  },
  { path: 'vivaldi',
    loadComponent: () => import('./vivaldi/vivaldi.page')
      .then(m => m.VivaldiPage)
  },
  { path: 'spring',
    loadComponent: () => import('./spring/spring.page')
      .then(m => m.SpringPage)
  },
  { path: 'summer',
    loadComponent: () => import('./summer/summer.page')
      .then(m => m.SummerPage)
  },
  { path: 'autumn',
    loadComponent: () => import('./autumn/autumn.page')
      .then(m => m.AutumnPage)
  },
  { path: 'winter',
    loadComponent: () => import('./winter/winter.page')
      .then(m => m.WinterPage)
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class SeasonsRoutingModule {
}
