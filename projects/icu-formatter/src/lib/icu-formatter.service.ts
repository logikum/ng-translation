/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { IntlMessageFormat } from 'intl-messageformat';
import {
  CurrencyValue,
  FormatExtender,
  FormatService,
  InterpolationData,
  LocalizationRef,
  NGT_CONFIGURATION
} from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { IntlFormatterService } from './intl-formatter.service';

@Injectable( {
  providedIn: 'root'
} )
export class IcuFormatterService implements FormatService {

  private readonly config = inject( NGT_CONFIGURATION );
  private readonly intlFormatter = inject( IntlFormatterService );
  extender: FormatExtender;

  constructor() { }

  insert(
    data: InterpolationData,
    args?: any
  ): string {

    return new IntlMessageFormat(
      data.text,
      data.locale,
      undefined,
      { formatters: this.intlFormatter.formatters }
    )
      .format( args ) as string;
  }

  getLocalizationRef(): LocalizationRef {

    return {
      number: (
        locale: string,
        value: number,
        args?: string
      ): string => {

        const text = this.createFormatElement( 'number', '', args );
        return this.getFormattedValue( text, locale, value );
      },
      percent: (
        locale: string,
        value: number,
        args?: string
      ): string => {

        const text = this.createFormatElement( 'number', 'percent', args );
        return this.getFormattedValue( text, locale, value );
      },
      currency: (
        locale: string,
        value: CurrencyValue,
        args?: string
      ): string => {

        const text = this.createFormatElement( 'number', `currency/${value[1]}`, args );
        return this.getFormattedValue( text, locale, value[0] );
      },
      money: (
        locale: string,
        value: number,
        currency?: string,
        args?: string
      ): string => {

        let vCurrency = currency || this.config.defaultCurrency;
        if (currency && (currency.length !== 3 ||
          [...currency].some( c => c !== c.toUpperCase() ))
        ) {
          vCurrency = this.config.defaultCurrency;
        }
        const text = this.createFormatElement( 'number', `currency/${vCurrency}`, args );
        return this.getFormattedValue( text, locale, value );
      },
      datetime: (
        locale: string,
        value: Date | number | string,
        args?: string
      ): string => {

        const text = this.createFormatElement( 'number', 'date', args );
        return this.getFormattedValue( text, locale, value );
      }
    } as LocalizationRef;
  }

  private createFormatElement(
    type: string,
    defaultStem: string,
    otherStems?: string
  ): string {

    const items = [ 'value', type ];
    const skeleton = `${defaultStem} ${otherStems}`.trim();
    if (skeleton) {
      items.push( '::' + skeleton );
    }
    return `{${ items.join(', ') }}`;
  }

  private getFormattedValue(
    text: string,
    locale: string,
    value: any
  ): string {

    return new IntlMessageFormat(
      text,
      locale,
      undefined,
      { formatters: this.intlFormatter.formatters }
    )
      .format( { value } ) as string;
  }
}
