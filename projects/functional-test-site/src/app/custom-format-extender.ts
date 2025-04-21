/* 3rd party libraries */
import { Injectable } from '@angular/core';
import { FormatData, TranspileExtenderBase } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { AppStatus } from './enums/app-status.enum';
import { LogLevel, Month, Season } from '../shared/enums/enums';

enum FormatName {
  roman = 'roman',
  appStatus = 'appStatus',
  logLevel = 'logLevel',
  season = 'season',
  month = 'month'
}

@Injectable()
export class CustomFormatExtender extends TranspileExtenderBase {

  readonly formatNames: Array<string> = [
    FormatName.roman,
    FormatName.appStatus,
    FormatName.logLevel,
    FormatName.season,
    FormatName.month
  ];

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    switch (format) {
      case FormatName.roman:
        return integerToRoman( parseInt( data.value, 10 ) );
      case FormatName.appStatus:
        return this.translation.get(`app.enums.appStatus.${ AppStatus[ data.value ] }`);
      case FormatName.logLevel:
        return this.translation.get(`enums.logLevel.${ LogLevel[ data.value ] }`);
      case FormatName.season:
        return this.translation.get(`enums.season.${ getEnumName( Season, data.value ) }`);
      case FormatName.month:
        return this.translation.get(`enums.month.${ Month[ data.value ] }`);
      default:
        return undefined;
    }
  }
}

function getEnumName(
  enumType: any,
  enumValue: number
): string {
  return Object.keys( enumType )[ Object.values( enumType ).indexOf( enumValue ) ];
}

function integerToRoman(
  num: number
): string {

  const digits = String( +num ).split( '' );
  const key = [
    '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
  ];
  let roman = '';
  let i = 3;
  while (i--) {
    roman = (key[ +digits.pop() + (i * 10) ] || '') + roman;
  }
  return Array( +digits.join( '' ) + 1 ).join( 'M' ) + roman;
}
