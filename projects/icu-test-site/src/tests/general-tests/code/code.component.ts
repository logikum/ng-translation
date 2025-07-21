/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import {
  NgTranslationModule,
  TranslationService
} from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-code',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
} )
export class CodeComponent {

  private readonly translation = inject( TranslationService );

  get elements(): string {
    return this.translation.get( 'general.text.otherElements' );
  }

  get earth(): string {
    return this.translation.get( 'general.text.element.earth' );
  }

  get water(): string {
    return this.translation.get( 'general.text.element.water' );
  }

  get wind(): string {
    return this.translation.get( 'general.text.element.wind' );
  }

  get fire(): string {
    return this.translation.get( 'general.text.element.fire' );
  }

  get smurfs(): string {
    return this.translation.get( 'general.text.smurfs' );
  }

  get seasons(): string {
    return this.translation.get( 'shared.fourSeasons' );
  }

  get spring(): string {
    return this.translation.get( 'enums.season.spring' );
  }

  get summer(): string {
    return this.translation.get( 'enums.season.summer' );
  }

  get autumn(): string {
    return this.translation.get( 'enums.season.autumn' );
  }

  get winter(): string {
    return this.translation.get( 'enums.season.winter' );
  }

  get pooh(): string {
    return this.translation.get( 'shared.pooh' );
  }

  get today(): string {
    return this.translation.get(
      'general.text.today',
      { today: Date.now() }
    );
  }

  get stock(): string {
    return this.translation.get(
      'general.text.stock',
      { surge: 0.0206, points: 16724.46 }
    );
  }

  get book(): string {
    return this.translation.get(
      'general.text.book',
      { current: 60, currency1: 'USD', onSale: 48, currency2: 'USD' }
    );
  }
}
