/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Winter } from '../../if-texts/seasons/i-text-winter';

@Component( {
  selector: 'nts-winter',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './winter.page.html',
  styleUrl: './winter.page.css'
} )
export class WinterPage {

  private readonly translation = inject( TranslationService );
  readonly t = this.translation.getTextObject<IText_Seasons$Winter>( 'seasons/winter' );
}
