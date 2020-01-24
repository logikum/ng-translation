import { Injectable } from '@angular/core';
import { TranslationConfig } from './translation-config.model';

const prefix = 'NG-TRANSLATION * ';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private isEnabled = false;
  private disableWarnings = false;

  setup(
    config: TranslationConfig
  ): void {

    if (config && config.disableWarnings === true) {
      this.disableWarnings = true;
    }
  }

  start(): void {
    this.isEnabled = !this.disableWarnings;
  }

  info(
    message: string
  ): void {

    if (this.isEnabled) {
      console.log( prefix + message );
    }
  }

  warn(
    message: string
  ): void {

    if (this.isEnabled) {
      console.warn( prefix + message );
    }
  }

  error(
    message: string
  ): void {

    console.error( prefix + message );
  }

  formatError(
    key: string,
    format: string
  ): void {

    this.display( key, format,
      'Not supported format:',
      'Missing format.' );
  }

  optionNameError(
    key: string,
    optionName: string
  ): void {

    this.display( key, optionName,
      'Not supported option:',
      'Missing option name.' );
  }

  optionValueError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Invalid option value:',
      'Missing option value.' );
  }

  dateStyleError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Not supported date style value:',
      'Missing date style value.' );
  }

  timeStyleError(
    key: string,
    optionValue: string
  ): void {

    this.display( key, optionValue,
      'Not supported time style value:',
      'Missing time style value.' );
  }

  pluralError(
    key: string,
    optionName: string
  ): void {

    this.display( key, optionName,
      'Option must be a number, a range or "other":',
      'Missing plural option.' );
  }

  private display(
    key: string,
    value: string,
    wrong: string,
    missing: string
  ): void {

    if (value) {
      this.warn( `[${ key }] ${ wrong } ${ value }` );
    } else {
      this.warn( `[${ key }] ${ missing }` );
    }
  }
}
