/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */

@Injectable( {
  providedIn: 'root'
} )
export class FormatterUtilityService {

  private readonly messenger = inject( MessengerService );

  missing(
    value: any
  ): boolean {

    return value === null || value === undefined;
  }

  checkMember(
    key: string,
    member: string,
    list: Array<string>
  ): string {

    if (!list.includes( member )) {
      this.messenger.optionValueError( key, member );
      return undefined;
    }
    return member;
  }

  getInt(
    key: string,
    optionValue: string
  ): number {

    const value = parseInt( optionValue, 10 );
    if (isNaN( value )) {
      this.messenger.optionValueError( key, optionValue );
      return undefined;
    }
    return value;
  }
}
