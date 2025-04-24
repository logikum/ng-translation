/* 3rd party libraries */
import { Injectable, signal, Signal } from '@angular/core';

/* locally accessible feature module code, always use a relative path */

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private titleSignal = signal('');

  get title(): Signal<string> {
    return this.titleSignal.asReadonly();
  }

  set title(value: string) {
    this.titleSignal.update(current => value);
  }
}
