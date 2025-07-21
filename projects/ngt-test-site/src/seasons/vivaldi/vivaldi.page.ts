/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Vivaldi } from '../../if-texts/seasons/i-text-vivaldi';

@Component( {
  selector: 'nts-vivaldi',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './vivaldi.page.html',
  styleUrl: './vivaldi.page.css'
} )
export class VivaldiPage {

  private readonly contentService = inject( ContentService );
  private readonly translation = inject( TranslationService );

  readonly t = this.translation.getTextObject<IText_Seasons$Vivaldi>( 'seasons/vivaldi' );

  constructor() {
    this.contentService.title = 'seasons';
  }
}
