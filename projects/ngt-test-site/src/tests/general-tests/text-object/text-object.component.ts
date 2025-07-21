/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { IText_General_Text, IText_General_TextObject } from '../../../if-texts/i-text-general';
import { IText_Shared } from '../../../if-texts/i-text-shared';
import { IText_Enums_Season } from '../../../if-texts/i-text-enums';

@Component( {
  selector: 'nts-text-object',
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

  get today(): Date {
    return new Date();
  }

  get rise(): number {
    return 0.0206;
  }

  get value(): number {
    return 16724.46;
  }

  get normalPrice(): CurrencyValue {
    return [60, 'USD'];
  }

  get specialPrice(): CurrencyValue {
    return [48, 'USD'];
  }
}
