/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'icu-vivaldi',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './vivaldi.page.html',
  styleUrl: './vivaldi.page.css'
})
export class VivaldiPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'seasons';
  }
}
