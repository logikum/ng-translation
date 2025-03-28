/* 3rd party libraries */
import { bootstrapApplication } from '@angular/platform-browser';

/* locally accessible feature module code, always use relative path */
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
