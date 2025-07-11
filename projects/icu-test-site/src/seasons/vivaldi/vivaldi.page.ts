/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Vivaldi } from '../../if-texts/seasons/i-text-vivaldi';

@Component({
  selector: 'icu-vivaldi',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './vivaldi.page.html',
  styleUrl: './vivaldi.page.css'
})
export class VivaldiPage {

  private contentService = inject(ContentService);
  private readonly translation = inject( TranslationService );
  t = this.translation.getBranch<IText_Seasons$Vivaldi>('seasons/vivaldi');

  constructor() {
    this.contentService.title = 'seasons';
  }
}
