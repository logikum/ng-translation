/* 3rd party libraries */
import { Inject, Injectable } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { MSG_PREFIX } from '../models/constants';

@Injectable( {
  providedIn: 'root'
} )
export class MessengerService {

  private isEnabled = false;

  get disableWarnings(): boolean {
    return !this.isEnabled;
  }

  set disableWarnings( value: boolean ) {
    this.isEnabled = value !== true;
  }

  info(
    message: string
  ): void {

    if (this.isEnabled) {
      console.log( MSG_PREFIX + message );
    }
  }

  warn(
    message: string
  ): void {

    if (this.isEnabled) {
      console.warn( MSG_PREFIX + message );
    }
  }

  error(
    message: string
  ): void {

    console.error( MSG_PREFIX + message );
  }

  formatError(
    key: string,
    format: string
  ): void {

    this.display( key, format,
      'Not supported format:',
      'Missing format.'
    );
  }

  optionNameError(
    key: string,
    optionName: string
  ): void {

    this.display( key, optionName,
      'Not supported option:',
      'Missing option name.'
    );
  }

  optionValueError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Invalid option value:',
      'Missing option value.'
    );
  }

  dateStyleError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Not supported date style value:',
      'Missing date style value.'
    );
  }

  timeStyleError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Not supported time style value:',
      'Missing time style value.'
    );
  }

  pluralError(
    key: string,
    optionName: string
  ): void {

    this.display( key, optionName,
      'Option must be a number, a range or "other":',
      'Missing plural option.'
    );
  }

  private display(
    key: string,
    value: string,
    wrong: string,
    missing: string
  ): void {

    if (key) {
      if (value) {
        this.warn( `[${ key }] ${ wrong } ${ value }` );
      } else {
        this.warn( `[${ key }] ${ missing }` );
      }
    } else {
      if (value) {
        this.warn( `${ wrong } ${ value }` );
      } else {
        this.warn( `${ missing }` );
      }
    }
  }
}
