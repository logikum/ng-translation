/* 3rd party libraries */
import { Routes } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
  { path: '**', component: ContentComponent },
];
