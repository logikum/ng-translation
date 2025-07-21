/* 3rd party libraries */
import { Injectable } from '@angular/core';
import { memoize } from '@formatjs/fast-memoize';

/* locally accessible feature module code, always use a relative path */

@Injectable( {
  providedIn: 'root'
} )
export class IntlFormatterService {

  numberFormat = memoize(
    ( locale, opts ) => new Intl.NumberFormat( locale, opts )
  );

  dateTimeFormat = memoize(
    ( locale, opts ) => new Intl.DateTimeFormat( locale, opts )
  );

  pluralRules = memoize(
    ( locale, opts ) => new Intl.PluralRules( locale, opts )
  );

  formatters = {
    getNumberFormat: this.numberFormat,
    getDateTimeFormat: this.dateTimeFormat,
    getPluralRules: this.pluralRules
  };
}
