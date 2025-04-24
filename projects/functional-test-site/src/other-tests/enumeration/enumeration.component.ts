/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';
import { AppStatus } from '../../app/enums/app-status.enum';
import { LogLevel, Month, Season } from '../../shared/enums/enums';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'fts-enumeration',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './enumeration.component.html',
  styleUrl: './enumeration.component.css'
} )
export class EnumerationComponent {

  get appStatuses(): Array<number> {
    return Object.values( AppStatus )
      .filter( status => !isNaN( status as number ) ) as Array<number>;
  }

  get logLevels(): Array<number> {
    return Object.values( LogLevel )
      .filter( level => !isNaN( level as number ) ) as Array<number>;
  }

  get seasons(): Array<string> {
    return Object.values( Season )
      .filter( season => season.length === 1 ) as Array<string>;
  }

  get months(): Array<number> {
    return Object.values( Month )
      .filter( m => !isNaN( m as number ) ) as Array<number>;
  }
}
