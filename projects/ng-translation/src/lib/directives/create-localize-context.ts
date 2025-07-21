/* 3rd party libraries */
import { CurrencyValue, DateValue, FormatData, LocalizationRef } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../translation.service';
import { LocalizeContext } from '../models';

const reservedNames = [
  'number', 'percent', 'currency', 'money', 'datetime', 'date', 'time'
];

export function createLocalizeContext(
  translation: TranslationService,
  localize: LocalizationRef
): LocalizeContext {

  const localizeContext: LocalizeContext = {
    number(
      value: number,
      args: string
    ): string {
      return localize.number( translation.activeLanguage, value, args );
    },
    percent(
      value: number,
      args: string
    ): string {
      return localize.percent( translation.activeLanguage, value, args );
    },
    currency(
      value: CurrencyValue,
      args: string
    ): string {
      return localize.currency( translation.activeLanguage, value, args );
    },
    money(
      value: number,
      currency: string,
      args: string
    ): string {
      return localize.money( translation.activeLanguage, value, currency, args );
    },
    datetime(
      value: DateValue,
      args: string
    ): string {
      return localize.datetime( translation.activeLanguage, value, args );
    },
    date(
      value: DateValue,
      args: string
    ): string {
      return localize.date( translation.activeLanguage, value, args );
    },
    time(
      value: DateValue,
      args: string
    ): string {
      return localize.time( translation.activeLanguage, value, args );
    }
  };

  if (translation.formatNameExtensions.length) {
    translation.formatNameExtensions.forEach( ( formatName: string ) => {

      if (reservedNames.includes( formatName )) {
        throw new Error(`Format name '${formatName}' is reserved.`);
      } else if (localizeContext.hasOwnProperty( formatName )) {
        throw new Error(`Format name '${formatName}' is already used.`);
      }
      localizeContext[ formatName ] = ( value: any, params?: string ): string => {
        const formatData: FormatData = {
          key: undefined,
          locale: translation.activeLanguage,
          params: params || '',
          value: value
        };
        return translation.custom( formatName, formatData );
      };
    } );
  }

  return localizeContext;
}
