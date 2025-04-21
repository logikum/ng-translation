/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { LocalizationRef, TranslationService } from '../services';
import { CurrencyValue } from '../types';
import { FormatData, LocalizeContext } from '../models';

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
    ccy(
      value: number,
      currency: string,
      args: string
    ): string {
      return localize.currency( translation.activeLanguage, [ value, currency ], args );
    },
    datetime(
      value: Date | number | string,
      args: string
    ): string {
      return localize.datetime( translation.activeLanguage, value, args );
    }
  };

  if (translation.formatNameExtensions.length) {
    translation.formatNameExtensions.forEach( ( formatName: string ) => {

      if ([ 'number', 'percent', 'currency', 'ccy', 'datetime' ].includes( formatName )) {
        throw new Error(`Format name '${formatName}' is reserved.`);
      } else if (localizeContext.hasOwnProperty( formatName )) {
        throw new Error(`Format name '${formatName}' is already used.`);
      }
      localizeContext[ formatName ] = (
        value: any, params?: string ): string => {
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
