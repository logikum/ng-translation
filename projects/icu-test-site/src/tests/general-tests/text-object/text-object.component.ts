/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { IText_General_Text, IText_General_TextObject } from '../../../if-texts/i-text-general';
import { IText_Shared } from '../../../if-texts/i-text-shared';
import { IText_Enums_Season } from '../../../if-texts/i-text-enums';

@Component( {
  selector: 'icu-text-object',
  imports: [],
  templateUrl: './text-object.component.html',
  styleUrl: './text-object.component.css'
} )
export class TextObjectComponent {

  private readonly translation = inject( TranslationService );

  readonly toText = this.translation.getTextObject<IText_General_Text>( 'general.text' );
  readonly toObject = this.translation.getTextObject<IText_General_TextObject>( 'general.textObject' );
  readonly toShared = this.translation.getTextObject<IText_Shared>( 'shared' );
  readonly toSeason = this.translation.getTextObject<IText_Enums_Season>( 'enums.season' );

  readonly today = { today: Date.now() };
  readonly stock = { surge: 0.0206, points: 16724.46 };
  readonly book = { current: 60, currency1: 'USD', onSale: 48, currency2: 'USD' };
}
