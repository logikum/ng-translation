/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { IntlMessageFormat } from 'intl-messageformat';
import {
  CurrencyValue, FormatExtender, FormatterService, InterpolationData,
  LocalizationRef, NGT_CONFIGURATION
} from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { IntlFormatterService } from './intl-formatter.service';

@Injectable( {
  providedIn: 'root'
} )
export class IcuFormatterService implements FormatterService {

  private readonly config = inject( NGT_CONFIGURATION );
  private readonly intlFormatter = inject( IntlFormatterService );

  extender: FormatExtender;

  get name() { return  'ICU Formatter Service'; }

  insert(
    data: InterpolationData,
    args?: any
  ): string {

    console.log( `ICU: ${ data.text }` );
    return new IntlMessageFormat(
      this.insertCurrency( data.text, args ),
      data.locale,
      undefined,
      { formatters: this.intlFormatter.formatters, ignoreTag: true }
    )
      .format( args ) as string;
  }

  private insertCurrency(
    text: string,
    args?: object
  ): string {

    const found = text.match( /currency\/_[_0-9]_/g );
    if (found) {
      found.forEach( placeholder => {
        const index = placeholder.match( /[0-9]/ );
        if (index === null) {
          text = text.replaceAll(
            '___',
            this.getCurrencyCode( args )
          );
        } else {
          text = text.replaceAll( `_${ index }_`,
            this.getCurrencyCode( args, index.toString() )
          );
        }
      } );
    }
    return text;
  }

  private  getCurrencyCode(
    args?: object,
    index?: string
  ): string {

    const currencyCode = args[ `currency${ index ?? '' }` ] || 'XXX';
    // Add eventual custom default options.
    return this.addCurrencyOptions( currencyCode );
  }

  private addCurrencyOptions(
    currencyCode: string,
  ): string {

    if (this.config.currencyDefaultOptions) {
      const cdo = this.config.currencyDefaultOptions[ currencyCode ] ?? '';
      if (cdo) {
        currencyCode += ' ' + cdo;
      }
    }
    return currencyCode;
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

        // Add eventual custom default options.
        const currencyCode = this.addCurrencyOptions( value[ 1 ] );
        const text = this.createFormatElement(
          'number',
          `currency/${ currencyCode }`,
          args
        );
        return this.getFormattedValue( text, locale, value[ 0 ] );
      },
      money: (
        locale: string,
        value: number,
        currency?: string,
        args?: string
      ): string => {

        let currencyCode = currency || this.config.defaultCurrency;
        if (currency && (currency.length !== 3 ||
          [ ...currency ].some( c => c !== c.toUpperCase() ))
        ) {
          currencyCode = this.config.defaultCurrency || 'XXX';
        }
        // Add eventual custom default options.
        currencyCode = this.addCurrencyOptions( currencyCode );
        const text = this.createFormatElement(
          'number',
          `currency/${ currencyCode }`,
          args
        );
        return this.getFormattedValue( text, locale, value );
      },
      datetime: (
        locale: string,
        value: Date | number | string,
        args?: string
      ): string => {
        throw new Error( 'Method datetime() is not implemented in ICU Formatter Service.' );
      },
      date: (
        locale: string,
        value: Date | number | string,
        args?: string
      ): string => {

        const text = this.createDatetimeElement( 'date', args );
        return this.getFormattedValue( text, locale, value );
      },
      time: (
        locale: string,
        value: Date | number | string,
        args?: string
      ): string => {

        const text = this.createDatetimeElement( 'time', args );
        return this.getFormattedValue( text, locale, value );
      }
    };
  }

  private createFormatElement(
    type: string,
    defaultStem: string,
    otherStems?: string
  ): string {

    const items = [ 'value', type ];
    const skeleton = `${ defaultStem } ${ otherStems }`.trim();
    if (skeleton) {
      items.push( '::' + skeleton );
    }
    return `{${ items.join( ', ' ) }}`;
  }

  private createDatetimeElement(
    type: string,
    stems?: string
  ): string {

    const items = [ 'value', type ];
    const otherStems = [];
    const stemArray = stems ? stems.split( ' ' ) : [];
    stemArray.forEach( stem => {
      if ([ 'short', 'medium', 'long', 'full' ].includes( stem )) {
        items.push( stem );
      } else if (stem) {
        otherStems.push( stem );
      }
    });
    const skeleton = otherStems.join( ' ' );
    if (skeleton) {
      items.push( '::' + skeleton );
    }
    return `{${ items.join( ', ' ) }}`;
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
