/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { TranslationService  } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly translation = inject(TranslationService);

  constructor() { }
}
