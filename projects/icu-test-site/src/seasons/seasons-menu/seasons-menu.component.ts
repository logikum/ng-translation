/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { IText_Seasons$Vivaldi } from '../../if-texts/seasons/i-text-vivaldi';

@Component( {
  selector: 'icu-seasons-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './seasons-menu.component.html',
  styleUrl: './seasons-menu.component.css'
} )
export class SeasonsMenuComponent {

  private readonly translation = inject( TranslationService );
  readonly t = this.translation.getTextObject<IText_Seasons$Vivaldi>( 'seasons/vivaldi' );
}
