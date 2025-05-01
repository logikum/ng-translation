/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { TranslationStringComponent } from './translation-string/translation-string.component';
import {
  LocalizationPipeComponent
} from './localization-pipe/localization-pipe.component';
import {
  LocalizationMethodComponent
} from './localization-method/localization-method.component';
import {
  CurrencyCodesComponent
} from './currency-codes/currency-codes.component';

@Component({
  selector: 'fts-null-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    TranslationStringComponent,
    LocalizationPipeComponent,
    LocalizationMethodComponent,
    CurrencyCodesComponent,
  ],
  templateUrl: './null-tests.page.html',
  styleUrl: './null-tests.page.css'
})
export class NullTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'null';
  }
}
