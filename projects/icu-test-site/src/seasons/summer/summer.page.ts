/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Summer } from '../../if-texts/seasons/i-text-summer';

@Component( {
  selector: 'icu-summer',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './summer.page.html',
  styleUrl: './summer.page.css'
} )
export class SummerPage {

  private readonly translation = inject( TranslationService );
  readonly t = this.translation.getTextObject<IText_Seasons$Summer>( 'seasons/summer' );
}
